# SDE Intern Backend (Nest.js)

This is a ready-to-run Nest.js scaffold for the SDE Intern (Backend) assessment:
- Nest.js + TypeORM + PostgreSQL
- JWT authentication (register/login)
- CRUD endpoints for Items with owner-based authorization
- Input validation and basic error handling
- Unit tests (Jest) for ItemsService

## Quick start

1. Copy `.env.example` to `.env` and adjust values.
2. Ensure PostgreSQL is running and database from .env exists.
3. Install dependencies:
   npm install
4. Start server:
   npm run start:dev
5. Run tests:
   npm run test

## Endpoints
- POST /auth/register { email, password }
- POST /auth/login { email, password } -> returns access_token
- GET /items (public)
- POST /items (auth)
- GET /items/:id
- PUT /items/:id (auth, owner only)
- DELETE /items/:id (auth, owner only)
