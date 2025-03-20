import type { Request, Response } from "express";
import { validateBody } from "./schemas.js";
import { modelUserLogin, modelValidateToken } from "./model.js";
import cookieParser from "cookie-parser";

/**
 * Validate user credentials
 *
 * @async
 * @function userLogin
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Response} JSON with a jsonwebtoken-
 */
export const userLogin = async (req: Request, res: Response): Promise<void> => {
  const validation = validateBody(req.body);

  if (!validation.success) {
    res.status(400).json({ message: JSON.parse(validation.error.message) });
    /*
     *  @todo : Proper status and error handling
     */
    return;
  }

  try {
    const data = await modelUserLogin(validation.data);

    res
      .status(200)
      .cookie("auth_token", data.token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 72,
        sameSite: "strict",
      })
      .send(data.publicUserData);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
    /*
     *  @todo : Proper status and error handling
     */
  }
};

/**
 * Removes a cookie
 *
 * @async
 * @function userLogout
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Response} JSON with a success message.
 */
export const userLogout = (_: Request, res: Response): void => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 72,
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logout successful " });
};

/**
 * Validates a jsonwebtoken and returns the information inside it if
 * it's valid.
 *
 * @async
 * @function validateToken
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Response} JSON response with user data.
 */
export const validateToken = (req: Request, res: Response): void => {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      console.log("token not found");
      throw new Error("Token not found");
    }

    const data = modelValidateToken(token);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
    /*
     *  @todo : Proper status and error handling
     */
  }
};
