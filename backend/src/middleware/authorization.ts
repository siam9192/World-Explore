import type { RequestHandler } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

import { env } from "../config/env.js";
import { UserRole, UserStatus } from "../generated/prisma/enums.js";
import prisma from "../lib/prisma.js";
import { HttpError } from "../utils/http-error.js";
import { AuthUser } from "../utils/interface.js";

declare module "express-serve-static-core" {
  interface Request {
    auth?: AuthUser;
  }
}

export default function authorization(
  roles: UserRole[],
  optional = false,
): RequestHandler {
  return async (request, _response, next) => {
    const authorizationHeader = request.get("authorization");
    if (!authorizationHeader && optional) {
      next();
      return;
    }

    const [scheme, token, extra] = authorizationHeader?.split(" ") ?? [];

    if (scheme !== "Bearer" || !token || extra) {
      next(new HttpError(401, "Authentication is required."));
      return;
    }

    let userId: string;
    try {
      const payload = jwt.verify(token, env.JWT_SECRET, {
        algorithms: ["HS256"],
      }) as JwtPayload;

      if (typeof payload.sub !== "string" || payload.sub.length === 0) {
        next(new HttpError(401, "The access token is invalid."));
        return;
      }
      userId = payload.sub;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        next(new HttpError(401, "The access token is invalid or expired."));
        return;
      }
      next(error);
      return;
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true, status: true },
      });

      if (!user) {
        next(new HttpError(401, "The authenticated account was not found."));
        return;
      }

      if (user.status === UserStatus.inactive) {
        next(new HttpError(401, "The account has blocked."));
        return;
      }

      if (!roles.includes(user.role)) {
        next(
          new HttpError(403, "You are not authorized to access this resource."),
        );
        return;
      }

      request.auth = { id: userId, role: user.role };
      next();
    } catch (error) {
      next(error);
    }
  };
}
