import type { Request, Response } from "express";
import { validateBody } from "./schemas.js";
import { modelUserLogin, modelValidateToken } from "./model.js";

/**
 * Validate user credentials
 *
 * @async
 * @function useLogin
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

    res.json(JSON.stringify(data.token));
  } catch (error: any) {
    res.status(401).json({ message: error.message });
    /*
     *  @todo : Proper status and error handling
     */
  }
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
    // ! This is NOT verified with Zod
    // TODO : Implement Zod verification

    const data = modelValidateToken(req.body);
    res.json(data);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
    /*
     *  @todo : Proper status and error handling
     */
  }
};
