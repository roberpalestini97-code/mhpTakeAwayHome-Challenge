# 🎬 Movie Search + Favorites (Take-Home Challenge)

This project implements a **full-stack** application for searching movies using the [OMDb API](https://www.omdbapi.com/) and managing a list of favorites.

The challenge was solved using:

- **Frontend:** Next.js 13 (App Router) + React Query (TanStack Query)
- **Backend:** NestJS (Node.js) with REST API


## 📂 Repository Structure

mhpTakeAwayHome-Challenge/
│── back/ # Backend with NestJS

│── front/ # Frontend with Next.js (App Router)

## 📌 Main Endpoints
Backend

GET /movies/search?q=<query> → Search for movies on OMDb.

POST /favorites → Add a movie to favorites.

GET /favorites → List all favorite movies.

DELETE /favorites/:id → Remove a movie from favorites.


Frontend

/ → Movie search page.

/favorites → Favorites list page.


## ⚙️ Setup

Install dependencies:
Run the following script in the root directory to install the dependencies for both stacks:
npm run install:all

▶️ Running the application
You can run the backend and frontend with a single command:
npm run dev
The backend (NestJS) will run at: http://localhost:4000
The frontend (Next.js) will run at: http://localhost:3000

## Running Tests

### Backend (NestJS)
cd backend
npm run test


---------------

Deployment & Production Readiness

While this project is designed as a take-home challenge, these are the recommended improvements and tools to deploy it to a secure and scalable production environment:

Environment Management
Use a .env file for storing sensitive data (API keys, secrets, etc.).

Persistence Layer
Store user favorites in SQLite for smaller environments or PostgreSQL/MySQL for production.
Recommended ORM: Prisma or TypeORM for managing database migrations and data consistency.

Testing & Quality
CI/CD pipeline with GitHub Actions to run tests on every pull request.

Deployment
Containerize the application with Docker (multi-stage build for frontend and backend).
Orchestrate deployments with Docker Compose or Kubernetes, depending on the scale.
