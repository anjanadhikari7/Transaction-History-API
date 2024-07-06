// Create a transaction

import transactionSchema from "../schema/transactionSchema.js";

// Get all transactions

export const getTransactions = (userId) => {
  return transactionSchema.find({ userId });
};

export const createTransaction = (transObj) => {
  return transactionSchema(transObj).save();
};

export const deleteSelectedIds = (selectedIds = []) => {
  return transactionSchema.deleteMany({ _id: { $in: selectedIds } });
};
