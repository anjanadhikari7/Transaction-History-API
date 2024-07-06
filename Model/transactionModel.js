// Create a transaction

import transactionSchema from "../schema/transactionSchema.js";

// Get all transactions

export const getTransactions = (userId) => {
  return transactionSchema.find({ userId });
};

export const createTransaction = (transObj) => {
  return transactionSchema(transObj).save();
};
