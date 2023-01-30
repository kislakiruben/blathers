import Express from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express.Application = Express();
const port = process.env.SERVER_PORT;

app.get("/", (req: Express.Request, res: Express.Response) => {
  res.send("hello world");
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
