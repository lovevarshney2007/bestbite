# BestBite Backend

## Overview

BestBite is a food delivery aggregator and comparison platform. The backend provides the API, auth, scraping, worker, and comparison logic required to power the app.

This backend supports:
- User authentication with JWT and refresh tokens
- Restaurant search and comparison
- Menu scraping from Swiggy-style flows
- Background workers and queue processing
- Redis and Prisma integration

## Purpose

The backend is built to serve the BestBite platform by:
- authenticating users
- storing restaurants, menus, and platform data
- running automated scraping jobs
- exposing APIs for frontend search, comparison, and admin fetch operations

## Swiggy Test Flow

The Swiggy test automates a user journey and menu scrape:
1. Hit API
2. Location already set / set karo
3. Search icon auto click
4. Search query auto type
5. Restaurant suggestion auto click
6. Restaurant page auto open
7. Menu scrape
8. Done

This flow is designed to validate the search+scrape workflow and collect menu data automatically.

## Tech Stack

Frontend: React, Vite, Tailwind, React Router, Axios, TanStack Query, Zustand

Backend: Node.js, Express, JWT, Prisma

Database: PostgreSQL, Redis

Workers: BullMQ, Node-cron, Playwright

Advanced / future: Kafka, Docker, Nginx, WebSockets, Monitoring

## Authentication API

Auth routes are mounted under `/api/v1/auth`.

### POST `/api/v1/auth/register`
- Register a new user
- Body: `name`, `email`, `password`
- Returns: user object with `id`, `name`, `email`

### POST `/api/v1/auth/login`
- Login user
- Body: `email`, `password`
- Returns: `accessToken`, `refreshToken`, and user info
- Cookies set: `accessToken`, `refreshToken`

### POST `/api/v1/auth/refresh-token`
- Refresh access token
- Reads `refreshToken` from cookies
- Returns new `accessToken`

### POST `/api/v1/auth/logout`
- Logout user
- Requires `Authorization: Bearer <accessToken>`
- Clears auth cookies and removes stored refresh token

## Backend Routes

The backend exposes these main route groups:
- `/api/v1/health` - service health check
- `/api/v1/test` - validation/test endpoint
- `/api/v1/auth` - register/login/refresh/logout
- `/api/v1/users` - protected user endpoints
- `/api/v1/restaurants` - restaurant management and search
- `/api/v1/menus` - menu data routes
- `/api/v1/platforms` - platform metadata routes
- `/api/v1/compare` - comparison endpoints
- `/api/v1/worker` - worker and queue operations

## Core Files

- `src/server.js` - Express setup, middleware, main router
- `src/routes/index.js` - route registration
- `src/routes/authRoutes.js` - auth endpoints
- `src/controllers/authController.js` - auth handlers
- `src/services/authServices.js` - auth business logic
- `src/middleware/auth.middleware.js` - JWT verification
- `src/utils/token.js` - JWT helpers
- `src/scrapers/swiggyTest.js` - automation and scraping flow

## Architecture

High-level flow:
- Frontend => Backend API => Aggregator / Comparison / Search => Redis + PostgreSQL => Workers / Fetchers

The backend is designed to support an eventual move toward event-driven architecture and microservices.

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create or update `.env` with database, Redis, and JWT settings
3. Start the server:
   ```bash
   npm start
   ```

## Notes

This README documents the backend role in the BestBite ecosystem, including the auth API and the core scraping/test flow. The project is intended to be the backend engine for search, comparison, caching, and menu aggregation.
