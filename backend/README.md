# BestBite Backend

## Project Overview

The backend is an Express.js API server that supports:
- Authentication and user management
- Swiggy-like scraping and search test automation
- Restaurant, menu, platform, compare, and worker routes
- Prisma ORM for database access
- Redis queue integration for asynchronous jobs

The server runs on `http://localhost:5000` by default and exposes routes under `/api/v1`.

## Swiggy Test Purpose

This project includes a Swiggy test flow that automates the user journey:
1. Hit API
2. Location already set / set karo
3. Search icon auto click
4. Search query auto type
5. Restaurant suggestion auto click
6. Restaurant page auto open
7. Menu scrape
8. Done

The test simulates search and restaurant selection, then scrapes menu data automatically.

## Authentication API

Authentication is handled under `/api/v1/auth`.

### POST `/api/v1/auth/register`
- Purpose: register a new user
- Request body:
  - `name` (string)
  - `email` (string, valid email)
  - `password` (string, minimum 6 chars)
- Response: created user data (id, name, email)

### POST `/api/v1/auth/login`
- Purpose: login an existing user
- Request body:
  - `email` (string)
  - `password` (string)
- Behavior:
  - verifies the user credentials
  - returns `accessToken` and `refreshToken`
  - sets cookies: `accessToken`, `refreshToken`

### POST `/api/v1/auth/refresh-token`
- Purpose: refresh the access token
- Behavior:
  - reads `refreshToken` from cookies
  - returns a new `accessToken`

### POST `/api/v1/auth/logout`
- Purpose: logout the user
- Behavior:
  - requires `Authorization: Bearer <accessToken>`
  - clears `accessToken` and `refreshToken` cookies
  - removes the stored refresh token from the user record

## Auth Flow Details

- Registration hashes the password with `bcrypt` and stores the user in the database.
- Login verifies the password and creates JWT tokens.
- `accessToken` is used for protected routes via `Authorization` header.
- `refreshToken` is stored in the database and used to issue new access tokens.
- Logout clears tokens and invalidates the refresh token.

## Core Files

- `src/server.js` - Express setup, middleware, and main router.
- `src/routes/index.js` - top-level API routing.
- `src/routes/authRoutes.js` - authentication endpoints.
- `src/controllers/authController.js` - auth request handling.
- `src/services/authServices.js` - auth business logic and token generation.
- `src/middleware/auth.middleware.js` - JWT verification for protected routes.
- `src/utils/token.js` - JWT token helpers.
- `src/scrapers/swiggyTest.js` - Swiggy test automation and scraping.

## Other Routes

- `/api/v1/health` - health check
- `/api/v1/test` - request validation example
- `/api/v1/users` - user-related routes (protected)
- `/api/v1/restaurants` - restaurant data routes
- `/api/v1/menus` - menu data routes
- `/api/v1/platforms` - platform-related routes
- `/api/v1/compare` - comparison routes
- `/api/v1/worker` - worker/queue related routes

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set environment variables in `.env`
3. Start the backend:
   ```bash
   npm start
   ```

## Notes

This backend is designed to support both auth and scraping flows. The Swiggy test is the main automation workflow, while auth APIs manage secure user access and token refresh.
