import { model, Schema } from "mongoose";
import { messageSchema } from "./message";

const subjectSchema = new Schema(
  {
    value: String,
    messageList: [messageSchema],
  },
  { timestamps: true }
);

export const Subjects = model("subjects", subjectSchema);
