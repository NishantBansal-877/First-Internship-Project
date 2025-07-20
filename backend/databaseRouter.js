//databaseRouter.js done

import express from "express";
import { handler } from "./mongoDB.js";
const router = express.Router();
let requestQueue = [];

router.route("/").post(database);

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


function database(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    
    const resultPromise = new Promise((resolve, reject) => {
      requestQueue.push({ data: body, resolve, reject });
    });

    resultPromise
      .then((reply) => {
        res.end(reply);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.end(err);
      });
  });
}


