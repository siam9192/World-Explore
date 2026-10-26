import { Router } from "express";

import authorization from "../../middleware/authorization.js";
import { UserRole } from "../../generated/prisma/enums.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import * as controller from "./user.controller.js";
import {
  adminUserUpdateSchema,
  profileUpdateSchema,
} from "./user.schema.js";

const router = Router();

router.get(
  "/me",
  authorization([UserRole.admin, UserRole.user]),
  controller.getMe,
);
router.patch(
  "/me",
  authorization([UserRole.admin, UserRole.user]),
  validateSchema(profileUpdateSchema),
  controller.updateMe,
);
router.get(
  "/",
  authorization([UserRole.admin]),
  controller.list,
);
router.get(
  "/:id",
  authorization([UserRole.admin]),
  controller.get,
);
router.patch(
  "/:id",
  authorization([UserRole.admin]),
  validateSchema(adminUserUpdateSchema),
  controller.update,
);

export default router;
