import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;

   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.headers.authorization) {
    token = req.headers.authorization; 
  }
  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not found in DB" });
    }

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({ success: false, message: "Not authorized, token invalid" });
  }
};
