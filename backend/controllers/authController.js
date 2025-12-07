// backend/controllers/authController.js
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

const sanitizeUser = (userDoc) => {
  const user = userDoc.toObject ? userDoc.toObject() : { ...userDoc };
  if (user.password) delete user.password;
  return user;
};

export const getMe = async (req, res, next) => {
  try {
    // protect middleware should have attached req.user
    const userId =
      req.user &&
      (req.user._id || req.user.id || req.user.userId);

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res
        .status(400)
        .json({ success: false, message: "Email already taken" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed });

    // Create "new enrollment" notification (non-blocking)
    try {
      await Notification.create({
        type: "new_enrollment",
        title: "New Student Enrollment",
        message: `${name} has enrolled in the platform`,
        read: false,
      });
    } catch (notifErr) {
      console.error("Failed to create enrollment notification:", notifErr);
    }

    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: "User registered",
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    // 🔐 Check if 2FA is enabled for this user
    const twoFactorEnabled =
      user.privacySettings?.twoFactorEnabled && user.twoFactorSecret;

    if (twoFactorEnabled) {
      // 1️⃣ Do NOT issue the full token yet.
      // Create a short-lived temp token just for the 2FA step
      const tempToken = jwt.sign(
        {
          userId: user._id,
          stage: "2fa",
        },
        JWT_SECRET,
        { expiresIn: "5m" } // 5 minutes
      );

      return res.json({
        success: true,
        require2fa: true,
        tempToken,
        message: "2FA required",
      });
    }

    // ✅ If 2FA is NOT enabled, normal login
    const token = generateToken(user);

    return res.json({
      success: true,
      message: "Login success",
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    next(err);
  }
};
