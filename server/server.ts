import bodyParser from "body-parser";
import dotenv from "dotenv";
import Express from "express";
import winston from "winston";
import expressWinston from "express-winston";

import nftGet from "./routes/nftGet";

dotenv.config();

const app: Express.Application = Express();
const port = process.env.PORT || process.env.SERVER_PORT;

app.use(bodyParser.json());
app.use(Express.static("dist"));
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    expressFormat: true,
    colorize: true,
  })
);
app.get("/api/nft", nftGet);
app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
