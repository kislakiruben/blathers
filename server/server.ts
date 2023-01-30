import bodyParser from "body-parser";
import dotenv from "dotenv";
import Express from "express";

dotenv.config();

const app: Express.Application = Express();
const port = process.env.SERVER_PORT;

app.use(bodyParser.json());
app.get("/", (req: Express.Request, res: Express.Response) => {
  res.send("hello world");
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
