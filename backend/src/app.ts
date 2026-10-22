import cors from "cors";
import express from "express";
import helmet from "helmet";

import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error-handler.js";
import { notFoundHandler } from "./middleware/not-found.js";
import apiRouter from "./routes/index.js";
import { successResponse } from "./utils/helpers.js";

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: env.CLIENT_ORIGIN }));
app.use(express.json({ limit: "16kb" }));

app.get("/health", (_request, response) => {
  return successResponse(response, 200, "API is healthy.", { status: "ok" });
});

app.use("/api/v1", apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
