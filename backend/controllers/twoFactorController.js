import speakeasy from "speakeasy";
import QRCode from "qrcode";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

/**
 * POST /api/auth/2fa/setup  (protected)
 */
export const startTwoFactorSetup = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const secret = speakeasy.generateSecret({
      name: `EduAid (${user.email})`,
    });

    user.twoFactorSecret = secret.base32;
    user.twoFactorEnabled = false;
    await user.save();

    const otpauthUrl = secret.otpauth_url;
    const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl);

    res.json({
      otpauthUrl,
      qrCodeDataUrl,
      secret: secret.base32,
    });
  } catch (err) {
    console.error("startTwoFactorSetup error", err);
    res.status(500).json({ message: "Failed to start 2FA setup" });
  }
};

/**
 * POST /api/auth/2fa/verify-setup  (protected)
 * Body: { token: "123456" }
 */
export const verifyTwoFactorSetup = async (req, res) => {
  try {
    const userId = req.user.id;
    const { token } = req.body;

    const user = await User.findById(userId);
    if (!user || !user.twoFactorSecret) {
      return res.status(400).json({ message: "2FA not initialized" });
    }

    const isValid = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!isValid) {
      return res.status(400).json({ message: "Invalid 2FA code" });
    }

    user.twoFactorEnabled = true;
    await user.save();

    res.json({ success: true, message: "Two-factor authentication enabled" });
  } catch (err) {
    console.error("verifyTwoFactorSetup error", err);
    res.status(500).json({ message: "Failed to verify 2FA" });
  }
};

/**
 * POST /api/auth/2fa/login
 * Body: { token: "123456", tempToken: "..." }
 */
export const verifyTwoFactorLogin = async (req, res) => {
  try {
    const { token, tempToken } = req.body;

    if (!tempToken || !token) {
      return res.status(400).json({ message: "Missing 2FA data" });
    }

    let payload;
    try {
      payload = jwt.verify(tempToken, JWT_SECRET);
    } catch (err) {
      return res
        .status(401)
        .json({ message: "2FA session expired or invalid" });
    }

    if (payload.stage !== "2fa") {
      return res.status(400).json({ message: "Invalid 2FA stage" });
    }

    const user = await User.findById(payload.userId);
    if (!user || !user.twoFactorSecret || !user.twoFactorEnabled) {
      return res
        .status(400)
        .json({ message: "2FA not enabled for this user" });
    }

    const isValid = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!isValid) {
      return res.status(400).json({ message: "Invalid 2FA code" });
    }

    // Final login token
    const fullToken = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.json({
      token: fullToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        twoFactorEnabled: user.twoFactorEnabled,
      },
    });
  } catch (err) {
    console.error("verifyTwoFactorLogin error", err);
    res.status(500).json({ message: "Failed to verify 2FA login" });
  }
};
