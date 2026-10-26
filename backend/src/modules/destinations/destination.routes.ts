import { Router } from "express";

import authorization from "../../middleware/authorization.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import { UserRole } from "../../generated/prisma/enums.js";
import controller from "./destination.controller.js";
import {
  destinationInputSchema,
  destinationUpdateSchema,
} from "./destination.schema.js";

const router = Router();

router.get(
  "/",
  authorization([UserRole.admin, UserRole.user], true),
  controller.list,
);
router.get(
  "/admin",
  authorization([UserRole.admin]),
  controller.listForAdmin,
);
router.get(
  "/:id",
  authorization([UserRole.admin, UserRole.user], true),
  controller.get,
);
router.post(
  "/",
  authorization([UserRole.admin]),
  validateSchema(destinationInputSchema),
  controller.create,
);
router.patch(
  "/:id",
  authorization([UserRole.admin]),
  validateSchema(destinationUpdateSchema),
  controller.update,
);
router.delete(
  "/:id",
  authorization([UserRole.admin]),
  controller.remove,
);

export default router;
