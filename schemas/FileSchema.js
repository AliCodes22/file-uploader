import * as z from "zod";

const FileSchema = z.object({
  originalname: z.string().trim().min(1, {
    message: "required",
  }),
  size: z.int(),
  mimetype: z.string(),
  path: z.string(),
  filename: z.string(),
});

export default FileSchema;
