import { Router } from "express";

import { validateSchema } from "../../middleware/validateSchema.js";
import {
  changePassword,
  login,
  register,
} from "./auth.controller.js";

import {
  changePasswordSchema,
  loginSchema,
  registerSchema,
} from "./auth.schema.js";
import authorization from "../../middleware/authorization.js";
import { UserRole } from "../../generated/prisma/enums.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateSchema(registerSchema),
  register,
);
authRouter.post("/login", validateSchema(loginSchema), login);
authRouter.patch(
  "/change-password",
  authorization([UserRole.admin,UserRole.user]),
  validateSchema(changePasswordSchema),
  changePassword,
);

export default authRouter;
