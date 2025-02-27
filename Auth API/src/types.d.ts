import type { z } from "zod";

type UserCredentials = z.infer<typeof UserCredentialsSchema>;

type UUID = `${string}-${string}-${string}-${string}`;

type UserData = {
  id: UUID;
  name: string;
  rut: string;
  password: string;
  status: string;
};
