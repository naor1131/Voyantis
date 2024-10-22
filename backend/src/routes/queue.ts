import express, { Request, Response, Router } from "express";
import messageQueue from "../types/messageQueue";

const router: Router = express.Router();

router.post("/queues/:queue_name", (req: Request, res: Response) => {
  const queueId = req.params.queue_name;
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  messageQueue.addMessage(queueId, message);
  res.status(201).json({ message: "Message added to queue" });
});

router.get("/queues/:queue_name", (req: Request, res: Response) => {
  const queueId = req.params.queue_name;
  const timeout = parseInt(req.query.timeout as string) || 2000; //changed it from 10 seconds so it would be easier to test

  setTimeout(() => {
    const nextMessage = messageQueue.getNextMessage(queueId);

    if (nextMessage) {
      return res.json(nextMessage);
    }

    return res.status(204).send();
  }, timeout);
});

router.get("/queues", (req: Request, res: Response) => {
  const queues = messageQueue.getAllQueues();
  return res.json(queues);
});

router.get("/ping", (req: Request, res: Response) => {
  return res.json({ ok: true });
});

export default router;
