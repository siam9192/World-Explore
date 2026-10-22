# WorldExplore API

REST API built with Node.js, TypeScript, Express, Prisma, PostgreSQL, and Zod.

## Setup

1. Install Node.js 20 or newer and PostgreSQL.
2. Copy `.env.example` to `.env` and set `DATABASE_URL` to your PostgreSQL database.
3. Install dependencies and create the database tables:

   ```sh
   npm install
   npm run prisma:generate
   npm run db:migrate
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

The API listens on `http://localhost:4000`. Set `CLIENT_ORIGIN` to the frontend origin when it differs from `http://localhost:3000`.

## Endpoints

- `GET /health` — API liveness check.
- `POST /api/v1/auth/register` — create an account from `{ "name": { "first", "last" }, "email", "password" }`.
- `POST /api/v1/auth/login` — verify email/password and return a bearer access token.
- `PATCH /api/v1/auth/change-password` — change the password using `Authorization: Bearer <token>` and `{ "oldPassword", "newPassword" }`.

Registration and new passwords require at least 8 characters, a number, and a symbol. Passwords are hashed before storage. Responses omit password hashes; duplicate email addresses return `409`. Access tokens expire after 7 days. Configure a random `JWT_SECRET` of at least 32 characters in `.env`.

All endpoints use a consistent response envelope: successful responses include `status`, `success: true`, and `message` (plus `data` when present); errors include `status`, `success: false`, `message`, and optional `errors`.

Set `NEXT_PUBLIC_API_URL` in the frontend environment to the API base URL, for example `http://localhost:4000/api/v1`. The frontend defaults to this local URL if the variable is unset.

## Commands

- `npm run build` — type-check and compile to `dist/`.
- `npm start` — start the compiled API.
- `npm run lint` — lint the TypeScript source.
- `npm run db:deploy` — apply committed Prisma migrations in deployment.
- `npm run db:studio` — open Prisma Studio.
