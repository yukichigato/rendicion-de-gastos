import express from "express";
import cors from "cors";
import logger from "morgan";
import { createRouter } from "./router.js";
import { PORT } from "./config.js";
import cookieParser from "cookie-parser";
const app = express();
const appRouter = createRouter();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(logger("dev"));
app.use(cookieParser());
app.use("/api", appRouter);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
