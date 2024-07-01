import express from "express";
import { createTransaction } from "../Model/transactionModel.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";

const transactionRouter = express.Router();

// Create transaction | Signup | POST
transactionRouter.post("/", async (req, res) => {
  try {
    const transaction = req.body;
    // db query to get
    const result = await createTransaction(transaction);

    result?._id
      ? buildSuccessResponse(res, result, "Transaction created!")
      : buildErrorResponse(res, "Cannot create transaction!");
  } catch (error) {
    buildErrorResponse(res, error.message);
  }
});
export default transactionRouter;
