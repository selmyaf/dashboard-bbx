# Bobobox Dashboard - Take Home Assignment

## Overview
A full-stack application for managing Bobobox units (capsules and cabins).  
Users can add new units, filter by type or status, and update statuses following specific business rules.

## Tech Stack
- Backend: Node.js (Express + TypeScript) + Prisma ORM + SQLite
- Frontend: React (Vite + TypeScript) + TailwindCSS
- Database: SQLite (`prisma/dev.db`)

## Setup & Run

### 1. Backend
cd backend
npm install
npx prisma migrate dev --name init
npm run dev

### 2. Frontend
cd frontend
npm install
npm run dev

## API Endpoints
- GET /api/units → list all units
Optional query params: ?status=Available&type=capsule
- GET /api/units/:id → get single unit
- POST /api/units → create new unit ({ name, type })
- PUT /api/units/:id → update status

## Business Logic
❌ Cannot change Occupied → Available directly
✅ Allowed: Occupied → Cleaning In Progress → Available
✅ Allowed: Occupied → Maintenance Needed → Available

## Frontend Features
View all units (name, type, status)
Filter by type or status
Add new unit (status defaults to Available)
Update status via dropdown (with backend validation)

## Testing (curl examples)
# Get all units
curl.exe -X GET "http://localhost:5000/api/units"
# Create unit
curl.exe -X POST "http://localhost:5000/api/units" -H "Content-Type: application/json" -d "{\"name\":\"Capsule-A01\",\"type\":\"capsule\"}"
# Update status
curl.exe -X PUT "http://localhost:5000/api/units/1" -H "Content-Type: application/

## Notes
- SQLite is used for simplicity (easier local testing).
- Prisma enums ensure type-safe status and type values.
- Business rules are strictly enforced in backend API.