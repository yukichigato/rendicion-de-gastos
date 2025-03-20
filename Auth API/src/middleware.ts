import express from "express";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";

export const setupMiddleware = (app: express.Application) => {
  app.use(express.json());
  app.use(
    cors({
      origin: "*", // Change this to the actual frontend URL in production
      credentials: true,
    })
  );
  app.use(logger("dev"));
  app.use(cookieParser());
};
