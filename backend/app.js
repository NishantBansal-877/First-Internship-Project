//app.js done

import express from "express";
import userRouter from "./userRouter.js";
import databaseRouter from "./databaseRouter.js";
import cors from "cors";

const app = express();

export const allowedOrigins = [
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5500",
  "http://192.168.181.130:3000",
  "http://127.0.0.1:3001",
  "http://192.168.0.103:62726",
  "https://json-convertor-chat.onrender.com",
  "https://json-convertor-excelupload.onrender.com",
  "https://azurechat.netlify.app",
  "https://exceload.netlify.app",
];

var corsOptions = {
  origin: [...allowedOrigins],
  optionsSuccessStatuc: 200,
};

app.use(cors(corsOptions));

app.use("/user", userRouter);
app.use("/json", databaseRouter);

const port = process.env.PORT || 5000;
app.listen(port, "127.0.0.1", () => {
  console.log("App is listening......");
});
