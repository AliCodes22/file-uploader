import * as zod from "zod";

const FileSchema = z.object({
  originalName: z.string().trim().min(1, {
    message: "required",
  }),
  size: z.int(),
  mimetype: z.string(),
  folderId: Int,
});

export default FileSchema;
