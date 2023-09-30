import { Subjects } from "../models/subject";
import { messageSchema } from "../models/message";

async function createSubject(body: { subject: string; content: string }) {
  const newSubject = new Subjects({
    value: body.subject,
    messageList: [{ content: body.content }],
  });
  const document = await newSubject.save();
  return document.toObject();
}

async function getSubject(subjectId: string) {
  const result = await Subjects.findById(subjectId, { messageList: 1 });
  return result?.toObject();
}

async function createsNewMessage(subjectId: string, body: { content: string }) {
  const newSubject = await Subjects.findByIdAndUpdate(
    subjectId,
    {
      $addToSet: { messageList: { content: body.content } },
    },
    { runValidators: true }
  );

  return newSubject?.toObject();
}

export const forumController = {
  createSubject,
  getSubject,
  createsNewMessage,
};
