//databaseRouter.js done

import express from "express";
import { handler } from "./mongoDB.js";
const router = express.Router();
let request = [];

router.route("/").post(addData).patch(updateData).delete(deleteData);

export default router;

async function continousFunction(res) {
  if (request.length > 0) {
    const data = request.shift();
    try {
      var reply = await handler(data);
    } catch (err) {
      console.error("Update error:", err);
    }
    res.end(reply);
  }
  setTimeout(continousFunction, 1000);
}

function addData(req, res) {
  let workbook = "";

  req.on("data", (chunk) => {
    workbook += chunk.toString();
  });

  req.on("end", async () => {
    request.push(workbook);
    continousFunction(res);
  });
}

function updateData(req, res) {
  let workbook = "";

  req.on("data", (chunk) => {
    workbook += chunk.toString();
  });

  req.on("end", async () => {
    request.push(workbook);
    continousFunction(res);
  });
}

function deleteData(req, res) {
  let workbook = "";

  req.on("data", (chunk) => {
    workbook += chunk.toString();
  });

  req.on("end", async () => {
    request.push(workbook);
    continousFunction(res);
  });
}
