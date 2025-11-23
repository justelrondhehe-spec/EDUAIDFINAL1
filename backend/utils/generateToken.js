// backend/utils/generateToken.js
import jwt from "jsonwebtoken";

/**
 * generateToken(user)
 * Accepts a user doc (or object with ._id) and returns a signed JWT.
 */
export const generateToken = (user) => {
  if (!user || !user._id) {
    throw new Error("generateToken: user._id is required");
  }

  const payload = {
    id: user._id.toString(),
  };

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET not set in environment");
  }

  // token expires in 7 days by default; change as needed
  const options = { expiresIn: process.env.JWT_EXPIRES_IN || "7d" };

  return jwt.sign(payload, secret, options);
};
