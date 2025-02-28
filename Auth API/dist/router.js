import { Router } from "express";
import { userLogin, validateToken } from "./controller.js";
export const createRouter = () => {
    const router = Router();
    /*
     *  @todo : Comment function
     */
    router.post("/login", userLogin);
    /*
     *  @todo : Comment function
     */
    router.post("/authentication", validateToken);
    return router;
};
