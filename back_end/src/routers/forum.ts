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

forumRouter.get(
  "/subjects",
  async (req: Request, res: Response, next: NextFunction) => {
    const subjectList = await forumController.getSubjectList();
    res.status(200);
    res.send(subjectList);
    return;
  }
);

forumRouter.get(
  "/messages/:subjectId",
  forumValidators.subjectIdParams,
  async (req: Request, res: Response, next: NextFunction) => {
    const vResult = validationResult(req);
    if (!vResult.isEmpty()) {
      res.status(400);
      res.send(vResult.array());
      return;
    }
    let messageList;
    try {
      messageList = await forumController.getMessageList(
        req.params["subjectId"]
      );
    } catch (err) {
      next(err);
      return;
    }

    if (!messageList) {
      res.status(404);
      res.send();
      return;
    }

    res.status(200);
    res.send(messageList);
  }
);

forumRouter.post(
  "/messages/:subjectId",
  forumValidators.postMessageBody,
  forumValidators.subjectIdParams,
  async (req: Request, res: Response, next: NextFunction) => {
    const vResult = validationResult(req);
    if (!vResult.isEmpty()) {
      res.status(400);
      res.send(vResult.array());
      return;
    }

    let newMessageList;
    try {
      newMessageList = await forumController.createsNewMessage(
        req.params.subjectId,
        req.body
      );
    } catch (err) {
      next(err);
      return;
    }

    if (!newMessageList) {
      res.status(404);
      res.send();
      return;
    }

    res.status(201);
    res.send(newMessageList);
  }
);

export { forumRouter };
