import z from "zod";
import type { UserCredentials } from "./types.js";

/*
 *  @todo : Properly detail schem
 */
const UserCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
});

/*
 *  @todo : Comment function
 */
export const validateBody = (input: UserCredentials) => {
  return UserCredentialsSchema.safeParse(input);
};
