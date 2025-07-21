//databaseRouter.js done

import express from "express";
import { handler } from "./mongoDB.js";
const router = express.Router();
let request = [];
let sendQueue = [];
router
  .route("/")
  .post(addData)
  .patch(updateData)
  .delete(deleteData)
  .get(sendData);

export default router;

async function continousFunction() {
  if (request[0]) {
    const data = request.shift();
    try {
      var status = await handler(data);
    } catch (err) {
      console.error("Update error:", err);
    }
    const { idNo } = JSON.parse(data);
    const obj = { idNo: idNo, status: status };
    sendQueue.push(obj);
  }
}

function sendData(req, res) {
  if (!sendQueue) {
    res.end(JSON.stringify(""));
  } else {
    const data = sendQueue.shift();
    res.end(JSON.stringify(data));
  }
}

function addData(req, res) {
  let workbook = "";

  req.on("data", (chunk) => {
    workbook += chunk.toString();
  });

  req.on("end", async () => {
    request.push(workbook);
    continousFunction();
    res.end();
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
