import { Router } from "express";

import authorization from "../../middleware/authorization.js";
import { UserRole } from "../../generated/prisma/enums.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import * as controller from "./review-report.controller.js";
import { updateReviewReportSchema } from "./review-report.schema.js";

const router = Router();

router.get(
  "/mine",
  authorization([UserRole.user, UserRole.admin]),
  controller.listMine,
);
router.get("/", authorization([UserRole.admin]), controller.list);
router.get("/:id", authorization([UserRole.admin]), controller.get);
router.patch(
  "/:id",
  authorization([UserRole.admin]),
  validateSchema(updateReviewReportSchema),
  controller.update,
);

export default router;
