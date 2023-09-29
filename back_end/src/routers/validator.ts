import { checkSchema } from "express-validator";



export const postSubjectBody = checkSchema(
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
  )