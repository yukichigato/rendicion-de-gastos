import { Router } from "express";
import { logout, userLogin, validateToken } from "./controller.js";

export const createRouter = () => {
  const router = Router();

  router.post("/login", userLogin);
  router.get("/authentication", validateToken);
  router.get("/logout", logout);

  return router;
};
