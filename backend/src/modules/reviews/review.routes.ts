import { Router } from "express";

import authorization from "../../middleware/authorization.js";
import { validateSchema } from "../../middleware/validateSchema.js";
import { UserRole } from "../../generated/prisma/enums.js";
import * as controller from "./review.controller.js";
import { reviewInputSchema, reviewUpdateSchema } from "./review.schema.js";
import { createReviewReport } from "./review-report.controller.js";
import { createReviewReportSchema } from "./review-report.schema.js";

const router = Router();

router.get("/", controller.list);
router.get(
  "/destination/:destinationId/summary",
  controller.destinationSummary,
);
router.get(
  "/destination/:destinationId",
  controller.listByDestination,
);
router.post(
  "/:id/reports",
  authorization([UserRole.user, UserRole.admin]),
  validateSchema(createReviewReportSchema),
  createReviewReport,
);
router.get("/:id", controller.get);
router.post(
  "/",
  authorization([UserRole.user, UserRole.admin]),
  validateSchema(reviewInputSchema),
  controller.create,
);
router.patch(
  "/:id",
  authorization([UserRole.user, UserRole.admin]),
  validateSchema(reviewUpdateSchema),
  controller.update,
);
router.delete(
  "/:id",
  authorization([UserRole.user, UserRole.admin]),
  controller.remove,
);

export default router;
