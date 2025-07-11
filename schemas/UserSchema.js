import * as z from "zod";

const UserSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export default UserSchema;
