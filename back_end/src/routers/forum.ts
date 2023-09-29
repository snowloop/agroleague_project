import Router, { NextFunction, Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import { postSubjectBody } from "./validator";
const forumRouter = Router();

forumRouter.post(
  "/subject",
  postSubjectBody,
  (req: Request, res: Response, next: NextFunction) => {
    const vResult = validationResult(req);
    console.log(req.body)
    if (!vResult.isEmpty()) {
      res.status(400);
      res.send(vResult.array());
      return;
    }
    res.send("Salut");
  }
);

export { forumRouter };
