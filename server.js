import express from "express";
import { connectMongo } from "./config/dbConfig.js";
import cors from "cors";
import userRouter from "./Router/userRouter.js";
import transactionRouter from "./Router/transactionRouter.js";
const app = express();
const PORT = process.nextTick.PORT || 8000;

// MiddleWares
app.use(express.json());
app.use(cors());
//Connect to Database

connectMongo();
// start a server

// Router | API Endpoints

app.use("/api/user", userRouter);
app.use("/api/transaction", transactionRouter);
app.listen(PORT, (error) => {
  error ? console.log("Error", error) : console.log("Server is running");
});
