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

interface UserCredentials {
  email: string;
  password: string;
}

interface ValidationReturn {
  publicUserData: {
    id: `${string}-${string}-${string}-${string}`;
    name: string;
    rut: string;
    status: string;
  };
  token: string;
}
