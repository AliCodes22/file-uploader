import * as z from "zod";

const FolderSchema = z.object({
  name: z.string().trim().min(1, { message: "Required" }),
});

export default FolderSchema;
