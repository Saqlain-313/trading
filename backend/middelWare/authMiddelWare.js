const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    let token;

    // Authorization header se token
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Cookie se token
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    // Token nahi mila
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // JWT verify
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "santosh"
    );

    req.user = decoded;

    req.id =
      decoded.userId ||
      decoded.id ||
      decoded._id;

    // User ID bhi nahi mila
    if (!req.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token: user ID missing",
      });
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};