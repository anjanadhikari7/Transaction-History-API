import express from "express";
import { comparePassword, hashPassword } from "../utility/bcryptHelper.js";
import { createUser, findUserByEmail } from "../Model/userModel.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";

const userRouter = express.Router();

// Create User | Signup | POST

userRouter.post("/signup", async (req, res) => {
  try {
    // Signup Process
    const { password, name, email } = req.body;
    // encrypt | hash the password
    const encryptedPassword = hashPassword(password);

    // Create user in Database
    const result = await createUser({
      name: name,
      email: email,
      password: encryptedPassword,
    });

    result?._id // null safety check
      ? buildSuccessResponse(res, result, "User created successfully!")
      : buildErrorResponse(res, "Could not register the user");
  } catch (error) {
    if (error.code === 11000) {
      error.message = "User with this email already exists!";
    }
    buildErrorResponse(res, error.message);
  }
});
// POST | User Login

userRouter.post("/Login", async (req, res) => {
  try {
    // Get email and password from request
    const { email, password } = req.body;

    // Find if the user existes in our database

    const user = await findUserByEmail(email);

    // User not found
    if (!user?._id) {
      return buildErrorResponse(res, "Invalid Credentials!!");
    }

    // User found

    const isPasswordMatched = comparePassword(password, user?.password);

    isPasswordMatched
      ? buildSuccessResponse(res, user, "Logged in successfully!!")
      : buildErrorResponse(res, "Invalid Credentials!!");
  } catch (error) {
    buildErrorResponse(res, "Invalid Credentials!!");
  }
});

export default userRouter;
