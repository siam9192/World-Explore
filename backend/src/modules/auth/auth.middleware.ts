import jwt, { type JwtPayload } from "jsonwebtoken";
import type { RequestHandler } from "express";

import { env } from "../../config/env.js";
import { HttpError } from "../../utils/http-error.js";

export const requireAuth: RequestHandler = (request, _response, next) => {
  const authorization = request.get("authorization");
  const [scheme, token, extra] = authorization?.split(" ") ?? [];

  if (scheme !== "Bearer" || !token || extra) {
    next(new HttpError(401, "Authentication is required."));
    return;
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET, {
      algorithms: ["HS256"],
    }) as JwtPayload;

    if (typeof payload.sub !== "string" || payload.sub.length === 0) {
      next(new HttpError(401, "The access token is invalid."));
      return;
    }

    request.auth = { userId: payload.sub };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new HttpError(401, "The access token is invalid or expired."));
      return;
    }

    next(error);
  }
};
