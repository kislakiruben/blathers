import Express from "express";

const app: Express.Application = Express();
const port = process.env.PORT;

app.get("/", (req: Express.Request, res: Express.Response) => {
  res.send("hello world");
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
