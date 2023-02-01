import bodyParser from "body-parser";
import dotenv from "dotenv";
import Express from "express";

import nftGet from "./routes/nftGet";

dotenv.config();

const app: Express.Application = Express();
const port = process.env.SERVER_PORT;

app.use(bodyParser.json());
app.use(Express.static("dist"));
app.get("/api/nft", nftGet);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
