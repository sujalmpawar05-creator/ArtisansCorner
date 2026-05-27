//JWT verify middleware
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {

  try {

    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    // Verify token
    const decoded = jwt.verify(token, "secretkey");

    // Find user
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    req.user = user;

    next();

  } catch (error) {

    res.status(401).json({
      success: false,
      message: "Invalid token"
    });

  }

};

module.exports = authMiddleware;

//Seller middleware
const sellerMiddleware = (req, res, next) => {

  if (req.user.role !== "seller") {

    return res.status(403).json({
      success: false,
      message: "Seller access only"
    });

  }

  next();

};

module.exports.sellerMiddleware = sellerMiddleware;

module.exports = {
  authMiddleware,
  sellerMiddleware
};