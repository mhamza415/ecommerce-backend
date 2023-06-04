import express from "express";
import {
  authUser,
  registerUser,
  createAdminUser,
} from "../controllers/userController.js";

const router = express.Router();

// @desc    create admin user
// route    http://localhost/8000/user/admin
let adminCreated = false;
router.route("/admin").post((req, res, next) => {
  try {
    if (adminCreated) {
      res.status(401);
      throw new Error("You are Unauthorized to create admin!");
    } else {
      createAdminUser(req, res, next);
      adminCreated = true;
    }
  } catch (error) {
    next(error);
  }
});

// @desc    Register a user
// @route   http://localhost/8000/user/register
// @access  Public

router.route("/register").post(registerUser);

// @desc    login a user and admin
// @route    http://localhost/8000/user/login
// @access  Public

router.route("/login").post(authUser);

export default router;
