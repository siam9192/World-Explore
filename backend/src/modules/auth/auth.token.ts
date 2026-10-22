import jwt from "jsonwebtoken";

import { env } from "../../config/env.js";

export function createAccessToken(userId: string): string {
  return jwt.sign({}, env.JWT_SECRET, {
    algorithm: "HS256",
    subject: userId,
    expiresIn: "7d",
  });
}
