// @desc    Register a new user
// @route   POST /api/user
// @access  Public

import User from "../models/userModel.js";
import generateToken from "../utills/generateToken.js";

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    //   @DESC      input validation
    if (!(name && email && password)) {
      res.status(400).send("All the inputs are required");
    }

    //   @DESC      check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("user already exists...");
    }

    const newUser = await User.create({ name, email, password });
    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        Token: generateToken(newUser._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    next(error);
  }
};
export { registerUser };
