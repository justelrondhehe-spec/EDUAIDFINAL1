// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded should contain the user id (depends on how you generated the token)
    // common patterns: { id: user._id } or the whole user. Adjust as needed.
    const userId = decoded.id || decoded._id || decoded.userId || decoded;

    // fetch user from DB (without password)
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;      // full user object
    req.userId = user._id; // convenience id
    next();
  } catch (err) {
    console.error("auth middleware error:", err);
    return res.status(401).json({ success: false, message: "Token is not valid" });
  }
};
