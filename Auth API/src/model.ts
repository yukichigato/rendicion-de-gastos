import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { UserData } from "./types.js";
import { SECRET_JWT_KEY, DB_API_URL } from "./config.js";

/*
 *  @todo : Comment function
 */
export const modelUserLogin = async (data: {
  email: string;
  password: string;
}) => {
  const { email, password } = data;

  const params = new URLSearchParams({
    email,
  });

  // Getting user by email
  const response = await fetch(`${DB_API_URL}/api/users?${params.toString()}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("User not found");
  }

  const userData: UserData = await response.json();

  const isValidPassword = await bcrypt.compare(password, userData.password);
  if (!isValidPassword) {
    throw new Error("Invalid password");
    /*
     *  @todo : Better error handling
     */
  }

  // Creating JWT
  const publicUserData = {
    id: userData.id,
    name: userData.name,
    rut: userData.rut,
    status: userData.status,
  };

  const token = jwt.sign(publicUserData, SECRET_JWT_KEY, {
    expiresIn: "1h",
    /*
     *  @todo : Sync expire time with cookie
     */
  });

  return { publicUserData, token };
};

/*
 *  @todo : Comment function
 */
export const modelValidateToken = (input: { token: string }) => {
  const { token } = input;

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY);
    return data;
  } catch (error: any) {
    throw new Error("Invalid token");
    /*
     *  @todo : Better error handling
     */
  }
};
