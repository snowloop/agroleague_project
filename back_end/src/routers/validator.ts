import { checkSchema } from "express-validator";

const subjectIdParams = checkSchema(
  {
    subjectId: { isMongoId: true },
  },
  ["params"]
);

const putSubjectBody = checkSchema(
  {
    subject: {
      isLength: {
        options: { min: 2 },
      },
    },
    content: {
      isLength: {
        options: {
          min: 2,
        },
      },
    },
  },
  ["body"]
);

const postMessageBody = checkSchema(
  {
    content: {
      isLength: {
        options: {
          min: 2,
        },
      },
    },
  },
  ["body"]
);

const forumValidators = {
  putSubjectBody,
  postMessageBody,
  subjectIdParams,
};

export { forumValidators };
