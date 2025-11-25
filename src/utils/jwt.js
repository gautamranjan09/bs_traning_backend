import jwt from "jsonwebtoken";

/**
 * Generate JWT access token
 * @param {Object} payload - Token payload (user data)
 * @returns {string} - Signed JWT token
 */

export const generateAccessToken = (payload) => {
  const secret = process.env.JWT_ACCESS_SECRET;
  const expiry = process.env.JWT_ACCESS_EXPIRY || "15m";

  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is not defined in environment variables");
  }

  return jwt.sign(payload, secret, {
    expiresIn: expiry,
    issuer: "auth-backend",
    audience: "auth-frontend",
  });
};

/**
 * Generate JWT refresh token
 * @param {Object} payload - Token payload (user data)
 * @returns {string} - Signed JWT token
 */
export const generateRefreshToken = (payload) => {
  const secret = process.env.JWT_REFRESH_SECRET;
  const expiry = process.env.JWT_REFRESH_EXPIRY || "7d";

  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET is not defined in environment variables");
  }

  return jwt.sign(payload, secret, {
    expiresIn: expiry,
    issuer: "auth-backend",
    audience: "auth-frontend",
  });
};

/**
 * Verify JWT access token
 * @param {string} token - JWT token to verify
 * @returns {Object} - Decoded token payload
 * @throws {Error} - If token is invalid or expired
 */
export const verifyAccessToken = (token) => {
  const secret = process.env.JWT_ACCESS_SECRET;

  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is not defined in environment variables");
  }

  try {
    return jwt.verify(token, secret, {
      issuer: "auth-backend",
      audience: "auth-frontend",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Access token has expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid access token");
    } else {
      throw error;
    }
  }
};

/**
 * Verify JWT refresh token
 * @param {string} token - JWT token to verify
 * @returns {Object} - Decoded token payload
 * @throws {Error} - If token is invalid or expired
 */
export const verifyRefreshToken = (token) => {
  const secret = process.env.JWT_REFRESH_SECRET;

  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET is not defined in environment variables");
  }

  try {
    return jwt.verify(token, secret, {
      issuer: "auth-backend",
      audience: "auth-frontend",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Refresh token has expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid refresh token");
    } else {
      throw error;
    }
  }
};

/**
 * Create token payload from user object
 * @param {Object} user - User document from database
 * @returns {Object} - Token payload
 */

export const createTokenPayload = (user) => {
  return {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };
};
