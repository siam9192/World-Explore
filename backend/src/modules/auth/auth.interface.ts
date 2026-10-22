export interface RegisterPayload {
  name: {
    first: string;
    last: string;
  };
  email: string;
  password: string;
}

export interface UserLoginPayload {
  email: string;
  password: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

declare module "express-serve-static-core" {
  interface Request {
    auth?: {
      userId: string;
    }
  }
}
