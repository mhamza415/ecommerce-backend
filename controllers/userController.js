import User from "../models/userModel.js";
import generateToken from "../utills/generateToken.js";

// @desc    Register a admin user
// @access  Public
const createAdminUser = async (req, res, next) => {
  try {
    // @desc    check if admin exists or not
    const adminUserExists = await User.findOne({ isAdmin: true });
    if (adminUserExists) {
      res.status(400);
      throw new Error("Admin user already exists");
    }

    // @desc  create a new admin
    const adminUser = await User.create({
      name: "admin",
      email: "admin@proshop.com",
      password: "1234",
      isAdmin: true,
    });
    if (adminUser) {
      res.status(201).json({
        _id: adminUser._id,
        name: adminUser.name,
        email: adminUser.name,
        isAdmin: adminUser.isAdmin,
        Token: generateToken(adminUser._id),
      });
    } else {
      res.status(500);
      throw new Error("Failed to create admin");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Register a new user
// @access  Public

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

// @desc    Register a new user
// @access  Public

const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // @desc    validate the user must send email and password
    if (!(email && password)) {
      res.status(400).send("email and password are required");
    }

    // @desc    check the account details are available
    const userExists = await User.findOne({ email });

    if (userExists && (await userExists.matchPassword(password))) {
      res.status(200).json({
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        isAdmin: userExists.isAdmin,
        Token: generateToken(userExists._id),
      });
    } else {
      res.status(401);
      throw new Error("invalid credentials");
    }
  } catch (error) {
    next(error);
  }
};

export { registerUser, authUser, createAdminUser };
