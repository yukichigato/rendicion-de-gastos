import type { Request, Response } from "express";
import { validateBody } from "./schemas.js";
import { modelUserLogin, modelValidateToken } from "./model.js";

export const userLogin = async (req: Request, res: Response): Promise<void> => {
  // Zod validation
  const validation = validateBody(req.body);

  if (!validation.success) {
    res.status(400).json({ message: JSON.parse(validation.error.message) });
    return;
  }

  // Validating email and password
  try {
    const data = await modelUserLogin(validation.data);

    res.json(JSON.stringify(data.token));
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const validateToken = (req: Request, res: Response): void => {
  try {
    const data = modelValidateToken(req.body);
    res.json(data);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const logout = (req: Request, res: Response): void => {
  res.clearCookie("auth_token");
};
