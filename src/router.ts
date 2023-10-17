import express, { Router, Request, Response } from "express";
import formatTheText from "./service/formatTheText";
import getToken from "./service/auth";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Express server");
});

router.post("/api/justify", (req: Request, res: Response) => {
  res.send(formatTheText(req.body));
});

router.post("/api/token", (req: Request, res: Response) => {
  const email: string | undefined = req.body.email;
  
  if(!email){
    res.status(400).send("Bad Request - Email is missing");
    return;
  }

  const token: string | undefined = getToken(email);

  token
  ? res.send(token)
  : res.sendStatus(401);
});

export default router;
