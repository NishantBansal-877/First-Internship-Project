//done userRouter.js

import express from "express";
import { main } from "./AzureBot.js";

const router = express.Router();

router.route("/").post(getReply);

export default router;

function getReply(req, res) {
  let textContent = "";

  req.on("data", (chunk) => {
    textContent += chunk.toString();
  });
  req.on("end", () => {
    main(JSON.stringify(textContent)).then((data) => {
      res.status(200).send(data);
    });
  });
}
