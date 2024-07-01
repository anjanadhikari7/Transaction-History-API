import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "expense",
  },
  date: {
    type: Date,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

export default mongoose.model("transaction", transactionSchema);
