import { Router } from "express";
import { userLogin, userLogout, validateToken } from "./controller.js";

export const createRouter = () => {
  const router = Router();

  /**
   * @route POST /login
   * @desc Vlidate user credentials and then generate a jsonwebtoken with userdata.
   * @access Public
   */
  router.post("/login", userLogin);

  /**
   * @route GET /authentication
   * @desc Validate the authentication cookie's jsonwebtoken. If the token is valid,
   * then return an object with user data.
   * @access Public
   * @returns {Object} 200 - User data inside the jsonwebtoken.
   */
  router.get("/authentication", validateToken);

  /**
   * @route GET /logout
   * @desc Removes the authentication cookie from the browser.
   * @access Public
   * @returns {Object} 200 - Success message.
   */
  router.get("/logout", userLogout);

  return router;
};
