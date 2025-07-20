//databaseRouter.js done

import express from "express";
import { handler } from "./mongoDB.js";
const router = express.Router();
let requestQueue = [];

router.route("/").post(handler);

export default router;

async function continousFunction() {
  if (requestQueue.length > 0) {
    const { data, resolve, reject } = requestQueue.shift();

    try {
      const reply = await handler(data);
      resolve(reply); 
    } catch (err) {
      console.error("Handler error:", err);
      reject("Failed to process");
    }
  }
  setTimeout(continousFunction, 100); 
}

continousFunction();


function handler(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    // Wrap response handling in a Promise
    const resultPromise = new Promise((resolve, reject) => {
      requestQueue.push({ data: body, resolve, reject });
    });

    resultPromise
      .then((reply) => {
        res.end(reply); // return response only when handler is done
      })
      .catch((err) => {
        res.statusCode = 500;
        res.end(err);
      });
  });
}


