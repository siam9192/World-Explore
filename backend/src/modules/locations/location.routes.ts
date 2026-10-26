import { Router } from "express";

import authorization from "../../middleware/authorization.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import { UserRole } from "../../generated/prisma/enums.js";
import * as controller from "./location.controller.js";
import {
  locationInputSchema,
  locationUpdateSchema,
} from "./location.schema.js";

const router = Router();

router.get("/", controller.list);
router.get("/:id", controller.get);
router.post(
  "/",
  authorization([UserRole.admin]),
  validateSchema(locationInputSchema),
  controller.create,
);
router.patch(
  "/:id",
  authorization([UserRole.admin]),
  validateSchema(locationUpdateSchema),
  controller.update,
);
router.delete("/:id", authorization([UserRole.admin]), controller.remove);

export default router;
