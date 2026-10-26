import { Router } from "express";

import activityRouter from "../modules/activities/activity.routes.js";
import authRouter from "../modules/auth/auth.routes.js";
import categoryRouter from "../modules/categories/category.routes.js";
import destinationRouter from "../modules/destinations/destination.routes.js";
import locationRouter from "../modules/locations/location.routes.js";
import reviewRouter from "../modules/reviews/review.routes.js";
import reviewReportRouter from "../modules/reviews/review-report.routes.js";
import userRouter from "../modules/users/user.routes.js";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/destinations", destinationRouter);
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/activities", activityRouter);
apiRouter.use("/locations", locationRouter);
apiRouter.use("/reviews", reviewRouter);
apiRouter.use("/review-reports", reviewReportRouter);
apiRouter.use("/users", userRouter);

export default apiRouter;
