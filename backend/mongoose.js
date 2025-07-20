//mongoose.js done

import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import mongoose from "mongoose";

//my credentials
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

//connecting database
await mongoose.connect(DB);
console.log("DB connected");

//creating dataSchema
const dataSchema = new mongoose.Schema({
  workbookName: String,
  workbookCreatedAt: String,
  workbookData: Array,
});

//creating originSchema
const originSchema = new mongoose.Schema({
  origin: {
    type: String,
    required: true,
  },
});

//creating Origins collections
// export const Origin = mongoose.model("Origin", originSchema);

//creating Datas collections
export const Data = mongoose.model("Data", dataSchema);
