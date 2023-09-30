import Router, { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { forumValidators } from "./validator";
import { forumController } from "../controllers/forum";

const forumRouter = Router();

forumRouter.put(
  "/subject",
  forumValidators.putSubjectBody,
  async (req: Request, res: Response, next: NextFunction) => {
    const vResult = validationResult(req);
    if (!vResult.isEmpty()) {
      res.status(400);
      res.send(vResult.array());
      return;
    }

    const newSubject = await forumController.createSubject(req.body);
    res.status(201);
    res.send(newSubject);
  }
);

forumRouter.get("/subjects" ,  async (req: Request, res: Response, next: NextFunction) => {
  const subjectList = await forumController.getSubjectList()
  res.status(200)
  res.send(subjectList)
  return
})

forumRouter.get(
  "/messages/:subjectId",
  async (req: Request, res: Response, next: NextFunction) => {
    let subject;
    try {
      subject = await forumController.getSubject(req.params["subjectId"]);
    } catch (err) {
      console.log(err);
      res.status(404).send();
      return;
    }

    res.status(200);
    res.send(subject?.messageList);
  }
);

forumRouter.post(
  "/messages/:subjectId",
  forumValidators.postMessageBody,
  async (req: Request, res: Response, next: NextFunction) => {
    const vResult = validationResult(req);
    if (!vResult.isEmpty()) {
      res.status(400);
      res.send(vResult.array());
      return;
    }

    const { subjectId } = req.params;
    let newSubject;
    let err: Error | undefined = undefined;
    try {
      newSubject = await forumController.createsNewMessage(subjectId, req.body);
    } catch (e) {
      console.log(e);
      err = e as Error;
    }

    if (err || !newSubject) {
      res.status(404);
      res.send();
      return;
    }
    res.status(201);
    res.send(newSubject);
    return;
  }
);

export { forumRouter };
