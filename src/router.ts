import express, { Router, Request, Response } from "express";
import formatTheText from "./service/formatTheText";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Express server");
});

router.post("/api/justify", (req: Request, res: Response) => {
  const justifyText: Array<string> = formatTheText(req.body);
  res.send(justifyText);
});

export default router;