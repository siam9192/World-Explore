import { Router } from "express";

import { catchAsync } from "../../middleware/catch-async.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import {
  changePassword,
  login,
  register,
} from "./auth.controller.js";
import { requireAuth } from "./auth.middleware.js";
import {
  changePasswordSchema,
  loginSchema,
  registerSchema,
} from "./auth.schema.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateSchema(registerSchema),
  catchAsync(register),
);
authRouter.post("/login", validateSchema(loginSchema), catchAsync(login));
authRouter.patch(
  "/change-password",
  requireAuth,
  validateSchema(changePasswordSchema),
  catchAsync(changePassword),
);

export default authRouter;
