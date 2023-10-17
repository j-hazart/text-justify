import dotenv from "dotenv";
import app from "./src/app"

dotenv.config();

const port = parseInt(process.env.APP_PORT ?? "5000");

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
