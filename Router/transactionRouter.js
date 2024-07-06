import express from "express";
import {
  createTransaction,
  getTransactions,
} from "../Model/transactionModel.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";
import { userAuth } from "../middleware/authMiddleware.js";

const transactionRouter = express.Router();

//GET all the transcations | GET

transactionRouter.get("/", userAuth, async (req, res) => {
  try {
    // Query the database
    const result = await getTransactions(req.userId);

    result
      ? buildSuccessResponse(res, result)
      : buildErrorResponse(res, error.message);
  } catch (error) {
    buildErrorResponse(res, error.message);
  }
});

// Create transaction | Signup | POST
transactionRouter.post("/", userAuth, async (req, res) => {
  try {
    const transaction = req.body;
    const userId = req.userId;
    // db query to get
    const result = await createTransaction({ ...transaction, userId });

    result?._id
      ? buildSuccessResponse(res, result, "Transaction created!")
      : buildErrorResponse(res, "Cannot create transaction!");
  } catch (error) {
    buildErrorResponse(res, error.message);
  }
});
export default transactionRouter;
