import express from "express";
import { createRouter } from "./router.js";
import { PORT } from "./config.js";
const app = express();
const appRouter = createRouter();
app.use(express.json());
app.use("/api", appRouter);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
