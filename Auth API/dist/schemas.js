import z from "zod";
const UserCredentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(20),
});
export const validateBody = (input) => {
    return UserCredentialsSchema.safeParse(input);
};
