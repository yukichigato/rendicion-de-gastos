import { Router } from "express";
import { userLogin } from "./controller.js";

export const createRouter = () => {
  const router = Router();

  router.post("/login", userLogin);

  return router;
};
