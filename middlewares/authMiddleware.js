import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded) {
        res.status(401);
        throw new Error("You are unauthorized to make this request");
      }

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Invalid token"); // Handle the case of invalid token
    }
  } else {
    res.status(401);
    throw new Error("No token found"); // Handle the case of missing token
  }
});

export { protect };
