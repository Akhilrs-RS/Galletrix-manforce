# ManForce ERP Backend

This is a production-ready Node.js backend for the ManForce ERP system.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Query Builder & Migrations:** Knex.js
- **Documentation:** Swagger (OpenAPI 3.0)
- **Security:** Helmet, CORS, Bcrypt, JWT

## Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running

## Getting Started

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Setup**
   - Copy `.env.example` to `.env.development`
   - Update the database credentials in `.env.development`

3. **Database Setup**
   - Create a database in PostgreSQL (default name: `manforce_erp_dev`)
   - Run migrations:
     ```bash
     npm run migrate:latest
     ```

4. **Run the Server**
   - Development mode:
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm run start
     ```

## API Documentation
Once the server is running, visit:
`http://localhost:5001/api-docs`

## Folder Structure
- `src/config`: Configuration files (DB, Swagger)
- `src/controllers`: Request handlers
- `src/migrations`: Database schema migrations
- `src/routes`: API route definitions
- `src/server.js`: Entry point
