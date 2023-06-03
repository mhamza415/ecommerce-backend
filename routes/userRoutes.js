import express from "express";
import { registerUser } from "../controllers/userController.js";

const router = express.Router();

// @desc    Register a user
// @route   http://localhost/8000/user/register
// @access  Public

router.route("/register").post(registerUser);

export default router;
