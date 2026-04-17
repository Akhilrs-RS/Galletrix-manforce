# ManForce ERP - Project Documentation

ManForce ERP is a comprehensive workforce management system designed for industrial and construction operations.

## Architecture Overview
- **Frontend**: React (Vite) + Tailwind CSS + Lucide React.
- **Backend**: Node.js + Express.
- **Database**: PostgreSQL with Knex.js for migrations and seeding.
- **Infrastructure**: Dockerized (PostgreSQL + Node.js).

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+)
- [Docker & Docker Compose](https://www.docker.com/)

### 1. Installation
```bash
# Clone the project
cd manforce-erp
npm install
cd backend && npm install
```

### 2. Environment Configuration
- Copy `backend/.env.example` to `backend/.env.development`.
- Update the database credentials in `backend/.env.development` if necessary.

### 3. Database Infrastructure (Docker)
We use Docker to manage PostgreSQL and pgAdmin.
```bash
# Start the database and pgAdmin containers
docker-compose up -d --build
```
- **PostgreSQL**: `localhost:5432` (Credentials in `.env.development`)
- **pgAdmin**: `http://localhost:5050` (Email: `admin@manforce.com`, Password: `admin`)

### 4. Database Migrations & Seeding
To initialize the database schema and populate it with sample data:
```bash
cd backend

# Run migrations
npm run migrate:latest

# Run seeds (Populates initial data)
npm run seed:run
```
*Note: The seed file creates several default users. The default password for seeded accounts (admin, hr, supervisor, accounts) is `password123`.*

### 5. Running the Application
```bash
# Run Frontend
npm run dev

# Run Backend
cd backend
npm run dev
```

## API Documentation
Once the backend server is running on port 5001, access the interactive Swagger API documentation at:
`http://localhost:5001/api-docs`

---

## Folder Structure
- `/src/pages`: Frontend UI views segmented by core/operations/compliance roles.
- `/src/utils`: API utility helper for frontend.
- `/backend/src`:
  - `controllers`: API request handling logic.
  - `routes`: API endpoint definitions.
  - `migrations`: Database schema definitions.
  - `seeds`: Initial sample data.

---

## Security & Maintenance
- **JWT Auth**: Authentication is handled via JWT tokens; protected routes require an `Authorization: Bearer <token>` header.
- **Docker**: Infrastructure is managed via `docker-compose.yml`, which includes `pgAdmin` for GUI-based database management.
- **Documentation**: All new endpoints must be documented using JSDoc/OpenAPI format inside the route files.
