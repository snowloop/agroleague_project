import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import morgan from "morgan"
import { forumRouter } from "./routers/forum";

const port = 3000;

const app = express();
app.use(morgan('combined'))


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Database connection
connect("mongodb://localhost:27017");

app.use("/forum", forumRouter);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send();
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send();
});

app.listen(port, () => {
  console.log(`Agroleague back-end is listening on port ${port}`);
});
