import "dotenv/config";
import express from "express";
import UserController from "./app/controllers/UserController";

import { createBullBoard } from "bull-board";
import { BullAdapter } from "bull-board/bullAdapter";

import { allQueues } from "./app/lib/Queue";

const { router } = createBullBoard(
  allQueues.map((e) => {
    return new BullAdapter(e.bull);
  })
);

const app = express();
app.use(express.json());
app.use("/admin/queues", router);

app.post("/users", UserController.store);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
