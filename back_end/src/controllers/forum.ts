import { Subjects } from "../models/subject";

async function createSubject(body: { subject: string; content: string }) {
  const newSubject = new Subjects({
    value: body.subject,
    messageList: [{ content: body.content }],
  });
  const document = await newSubject.save();
  return document.toObject();
}

async function getMessageList(subjectId: string) {
  const subject = await Subjects.findById(subjectId, { messageList: 1 });
  return subject?.messageList;
}

async function getSubjectList() {
  const subjectDocList = await Subjects.find({}, "-messageList -__v");

  const subjectList = [];
  for (const subjectDoc of subjectDocList) {
    subjectList.push(subjectDoc.toObject());
  }
  return subjectList;
}

async function createsNewMessage(subjectId: string, body: { content: string }) {
  const newSubject = await Subjects.findByIdAndUpdate(
    subjectId,
    {
      $addToSet: { messageList: { content: body.content } },
    },
    { runValidators: true, projection: "messageList", returnDocument: "after" }
  );

  return newSubject?.toObject().messageList;
}

export const forumController = {
  createSubject,
  getMessageList,
  getSubjectList,
  createsNewMessage,
};
