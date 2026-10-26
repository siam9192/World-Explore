import type { RequestHandler } from "express";
import type { ParamsDictionary } from "express-serve-static-core";

import { catchAsync } from "../../middleware/catch-async.js";
import type {
  ChangePasswordPayload,
  RegisterPayload,
  UserLoginPayload,
} from "./auth.interface.js";
import {
  changeUserPassword,
  loginUser,
  registerUser,
} from "./auth.service.js";
import { errorResponse, successResponse } from "../../utils/helpers.js";

export const register: RequestHandler<
  ParamsDictionary,
  unknown,
  RegisterPayload
> = catchAsync(async (request, response) => {
  const result = await registerUser(request.body);

  return successResponse(
    response,
    201,
    "Your account was created successfully.",
    result,
  );
});

export const login: RequestHandler<
  ParamsDictionary,
  unknown,
  UserLoginPayload
> = catchAsync(async (request, response) => {
  const result = await loginUser(request.body);

  return successResponse(response, 200, "You are now logged in.", result);
});

export const changePassword: RequestHandler<
  ParamsDictionary,
  unknown,
  ChangePasswordPayload
> = catchAsync(async (request, response) => {
  const userId = request.auth?.id;
  if (!userId) {
    return errorResponse(response, 401, "Authentication is required.");
  }

  await changeUserPassword(userId, request.body);
  return successResponse(
    response,
    200,
    "Your password was changed successfully.",
  );
});
