import { Schema, Model } from "mongoose";

export const messageSchema = new Schema(
  {
    content: String,
  },
  { timestamps: true }
);

