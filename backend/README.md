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
- `GET|PATCH /api/v1/users/me` — retrieve or update the signed-in user's profile.
- `GET /api/v1/users` — search, filter, sort, and paginate users (administrator token required).
- `GET|PATCH /api/v1/users/:id` — retrieve or update a user (administrator token required). Admin updates can change profile fields, email, role, and status; passwords remain managed through authentication endpoints.
- `PATCH /api/v1/auth/change-password` — change the password using `Authorization: Bearer <token>` and `{ "oldPassword", "newPassword" }`.

Registration and new passwords require at least 8 characters, a number, and a symbol. Passwords are hashed before storage. Responses omit password hashes; duplicate email addresses return `409`. Access tokens expire after 7 days. Configure a random `JWT_SECRET` of at least 32 characters in `.env`.

All endpoints use a consistent response envelope: successful responses include `status`, `success: true`, and `message` (plus `data` when present); errors include `status`, `success: false`, `message`, and optional `errors`.

Set `NEXT_PUBLIC_API_URL` in the frontend environment to the API base URL, for example `http://localhost:4000/api/v1`. The frontend defaults to this local URL if the variable is unset.

## Destination and catalog endpoints

- `GET /api/v1/destinations` — list active destinations with optional `search` and `category` filters; supports `page` and `limit`.
- `GET /api/v1/destinations/:id` — retrieve a destination by ID or slug, including its activities, location, and category names.
- `POST /api/v1/destinations`, `PATCH|DELETE /api/v1/destinations/:id` — manage destinations (administrator token required for writes). The create payload follows `frontend/public/json/destinations.json`; `tagline` and `highlights` may be omitted, and `tagline` defaults to `shortDescription`.
- `GET /api/v1/categories` — list categories attached to active destinations; supports `search`, `sortBy` (`name`, `createdAt`, `updatedAt`, or `totalDestinations`), `sortOrder`, `page`, and `limit`.
- `GET /api/v1/categories/admin` — list all categories with destination counts and the same query options (administrator token required).
- `POST /api/v1/categories`, `GET|PATCH|DELETE /api/v1/categories/:id` — manage categories; writes require an administrator token.
- `GET|POST /api/v1/activities`, `GET|PATCH|DELETE /api/v1/activities/:id` — browse and manage destination activities; writes require an administrator token.
- `GET|POST /api/v1/locations`, `GET|PATCH|DELETE /api/v1/locations/:id` — browse and manage standalone locations; listing supports `search`, `city`, `state`, `country`, `address`, `full`, `mapUrl`, `sortBy`, `sortOrder`, `page`, and `limit`; writes require an administrator token.
- `GET /api/v1/reviews` — list reviews with optional `search`, `destinationId`, `authorId`, `rating`, `minRating`, `maxRating`, `sortBy`, `sortOrder`, `page`, and `limit`.
- `GET /api/v1/reviews/destination/:destinationId` — list a destination's reviews with pagination and review search/rating/sort filters.
- `GET /api/v1/reviews/destination/:destinationId/summary` — retrieve a destination's average rating, total reviews, and rating-count breakdown.
- `POST /api/v1/reviews`, `GET|PATCH|DELETE /api/v1/reviews/:id` — create, browse, edit, and delete reviews; creating, editing, or deleting a review requires authentication, and only its author may edit or delete it.
- `POST /api/v1/reviews/:id/reports` — submit one report per signed-in user for a review, with a reason and optional details.
- `GET /api/v1/review-reports/mine` — list the signed-in user's review reports.
- `GET /api/v1/review-reports` and `GET|PATCH /api/v1/review-reports/:id` — administrator-only report queue, details, and status moderation (`pending` → `reviewed`/`resolved`/`dismissed`; `reviewed` → `resolved`/`dismissed`).

List endpoints return pagination metadata. Destination create and update payloads refer to existing categories by ID. Review changes keep each destination's rating and review count synchronized.

## Commands

- `npm run build` — type-check and compile to `dist/`.
- `npm start` — start the compiled API.
- `npm run lint` — lint the TypeScript source.
- `npm run db:deploy` — apply committed Prisma migrations in deployment.
- `npm run db:studio` — open Prisma Studio.
