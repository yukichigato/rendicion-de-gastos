import z from "zod";
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
export const validateBody = (input) => {
    return UserCredentialsSchema.safeParse(input);
};
