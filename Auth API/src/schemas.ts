import z from "zod";
import type { UserCredentials } from "./types.js";

const UserCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
});

export const validateBody = (input: UserCredentials) => {
  return UserCredentialsSchema.safeParse(input);
};
