import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { UserCredentials, UserData, ValidationReturn } from "./types.js";
import { SECRET_JWT_KEY, DB_API_URL } from "./config.js";

/**
 * Handles user login by verifying the email and password.
 *
 * @async
 * @function modelUserLogin
 *
 * @param {UserCredentials} data - The data for user login (email and password)
 * @returns {Promise<ValidationReturn>} - Returns a user object if authentication is successful, otherwise `null`
 * @throws {Error} If there is an internal error during the login process
 */
export const modelUserLogin = async (
  data: UserCredentials
): Promise<ValidationReturn> => {
  const { email, password } = data;
  const params = new URLSearchParams({ email });

  // Getting user by email
  const endpoint = `${DB_API_URL}/api/users?${params.toString()}`;
  const response = await fetch(endpoint, { method: "GET" });

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

  // * Token expiration is not synced with Cookie expiration time
  // TODO : Sync the expiration times

  const token = jwt.sign(publicUserData, SECRET_JWT_KEY, {
    expiresIn: "72h",
  });

  return { publicUserData, token };
};

/**
 * Validates a JWT token by verifying its signature using the secret key.
 *
 * @function modelValidateToken
 * @async
 *
 * @param {Object} input - The input object containing the token to be validated
 * @param {string} input.token - The JWT token as a string (note: it has extra quotation marks around it)
 *
 * @returns {Omit<UserData, "password">} - The decoded token data if the token is valid
 * @throws {Error} - Throws an error if the token is invalid or verification fails
 */
export const modelValidateToken = (input: { token: string }) => {
  const { token } = input;

  const realtoken = token.slice(1, -1);
  // ! This is really bad, but for whatever reason the token is getting sent
  // ! with extra quotation marks ('" ... "') instead of (" ... ").
  // TODO: Fix

  try {
    const data = jwt.verify(realtoken, SECRET_JWT_KEY);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
    /*
     *  @todo : Better error handling
     */
  }
};
