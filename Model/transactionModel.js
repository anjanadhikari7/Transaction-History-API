// Create a transaction

import transactionSchema from "../schema/transactionSchema.js";

export const createTransaction = (transObj) => {
  return transactionSchema(transObj).ssave();
};
