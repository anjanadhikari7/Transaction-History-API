import express from "express";
import {
  createTransaction,
  deleteSelectedIds,
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

// Delete Transaction | Delete | Delete
transactionRouter.delete("/", userAuth, async (req, res) => {
  try {
    const { selectedIds } = req.body;
    console.log("selectedIds", req.body);
    const result = await deleteSelectedIds(selectedIds);

    result?._id
      ? buildSuccessResponse(res, result, "Transaction deleted!")
      : buildErrorResponse(res, "Cannot delete transaction!");
  } catch (error) {
    buildErrorResponse(res, "Cannot delete transaction CATCH!");
  }
});

export default transactionRouter;
