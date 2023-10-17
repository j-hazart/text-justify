import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = parseInt(process.env.APP_PORT ?? "5000");

app.get("/", (req: Request, res: Response) => {
  res.send("Express server");
});


app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
