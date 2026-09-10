const jwt = require("jsonwebtoken");
const User = require("../models/authmodel");

// ============================================================
// GET TOKEN FROM COOKIE / HEADER
// ============================================================

const getToken = (req) => {
  const cookies = req.cookies || {};

  console.log(
    "COOKIES IN getToken():",
    cookies
  );

  // ----------------------------------------------------------
  // ADMIN COOKIE
  // ----------------------------------------------------------

  if (cookies.adminToken) {
    console.log("TOKEN SOURCE: Admin Cookie");
    return cookies.adminToken;
  }

  // ----------------------------------------------------------
  // USER COOKIE
  // ----------------------------------------------------------

  if (cookies.powerhit) {
    console.log("TOKEN SOURCE: User Cookie");
    return cookies.powerhit;
  }

  // ----------------------------------------------------------
  // AUTHORIZATION HEADER FALLBACK
  // ----------------------------------------------------------

  const authHeader = req.headers?.authorization;

  if (
    authHeader &&
    authHeader.startsWith("Bearer ")
  ) {
    console.log(
      "TOKEN SOURCE: Authorization Header"
    );

    return authHeader
      .substring(7)
      .trim();
  }

  console.log("TOKEN SOURCE: NONE");

  return null;
};

// ============================================================
// PROTECT USER / ADMIN
// ============================================================

const protect = async (req, res, next) => {
  try {
    const token = getToken(req);

    // --------------------------------------------------------
    // NO TOKEN
    // --------------------------------------------------------

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    // --------------------------------------------------------
    // JWT SECRET
    // --------------------------------------------------------

    if (!process.env.JWT_SECRET) {
      console.error(
        "JWT_SECRET is not configured"
      );

      return res.status(500).json({
        success: false,
        message: "JWT configuration error",
      });
    }

    // --------------------------------------------------------
    // VERIFY JWT
    // --------------------------------------------------------

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
    } catch (jwtError) {
      console.error(
        "JWT VERIFY ERROR:",
        jwtError.message
      );

      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // --------------------------------------------------------
    // FIND USER BY MONGODB _id
    // --------------------------------------------------------

    let user = null;

    if (decoded.id) {
      try {
        user = await User.findById(
          decoded.id
        ).select(
          "-password -plainPassword"
        );
      } catch (error) {
        console.error(
          "USER FIND ERROR:",
          error.message
        );
      }
    }

    // --------------------------------------------------------
    // FALLBACK BY NUMERIC USER ID
    // --------------------------------------------------------

    if (
      !user &&
      decoded.userId !== undefined &&
      decoded.userId !== null
    ) {
      const numericUserId = Number(
        decoded.userId
      );

      if (
        Number.isFinite(numericUserId)
      ) {
        user = await User.findOne({
          userId: numericUserId,
        }).select(
          "-password -plainPassword"
        );
      }
    }

    // --------------------------------------------------------
    // USER NOT FOUND
    // --------------------------------------------------------

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // --------------------------------------------------------
    // BLOCKED USER
    // --------------------------------------------------------

    if (user.status === "blocked") {
      return res.status(403).json({
        success: false,
        message:
          "Your account has been blocked",
      });
    }

    // --------------------------------------------------------
    // ATTACH USER
    // --------------------------------------------------------

    req.user = user;

    // Numeric application user ID
    req.userId = Number(user.userId);

    // MongoDB ID compatibility
    req.id = user._id;

    next();

  } catch (error) {
    console.error(
      "PROTECT ERROR:",
      error
    );

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

// ============================================================
// ADMIN ONLY
// ============================================================

const adminProtect = (
  req,
  res,
  next
) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access only",
    });
  }

  next();
};

// ============================================================
// USER ONLY
// ============================================================

const userProtect = (
  req,
  res,
  next
) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (req.user.role !== "user") {
    return res.status(403).json({
      success: false,
      message: "User access only",
    });
  }

  next();
};

// ============================================================
// EXPORT
// ============================================================

module.exports = {
  protect,
  adminProtect,
  userProtect,
};