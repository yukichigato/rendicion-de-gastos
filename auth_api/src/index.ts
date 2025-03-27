import express from "express";
import { createRouter } from "./router.js";
import { PORT } from "./config.js";
import { setupMiddleware } from "./middleware.js";

const app = express();
const appRouter = createRouter();

setupMiddleware(app);

app.use("/api", appRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
