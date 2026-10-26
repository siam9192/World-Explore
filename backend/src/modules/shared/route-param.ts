import { HttpError } from "../../utils/http-error.js";

export function routeParam(
  value: string | string[] | undefined,
  name: string,
) {
  if (typeof value !== "string" || value.length === 0) {
    throw new HttpError(400, `A valid ${name} is required.`);
  }
  return value;
}
