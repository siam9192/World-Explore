import { Router } from "express";

import authorization from "../../middleware/authorization.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import { UserRole } from "../../generated/prisma/enums.js";
import * as controller from "./category.controller.js";
import {
  categoryInputSchema,
  categoryUpdateSchema,
} from "./category.schema.js";

const router = Router();

router.get("/", controller.list);
router.get(
  "/admin",
  authorization([UserRole.admin]),
  controller.listForAdmin,
);
router.get("/:id", controller.get);
router.post(
  "/",
  authorization([UserRole.admin]),
  validateSchema(categoryInputSchema),
  controller.create,
);
router.patch(
  "/:id",
  authorization([UserRole.admin]),
  validateSchema(categoryUpdateSchema),
  controller.update,
);
router.delete("/:id", authorization([UserRole.admin]), controller.remove);

export default router;
