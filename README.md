# Student Health and Wellness Platform

A health and wellness management platform for university students with role-based access for administrators and students.

## Features

- Authentication with admin and student roles
- Admin dashboard and student dashboard
- Protected routes on the frontend
- Spring Boot backend login API

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Spring Boot 3 (Java 17)

## Prerequisites

- Node.js 18+
- npm or yarn
- Java 17+
- Maven 3.9+

## Project Structure

```text
student-health-wellness/
|-- backend/
|   |-- pom.xml
|   `-- src/main/java/com/studenthealth/backend/
|-- src/
|-- package.json
`-- vite.config.js
```

## Run the Project

1. Install frontend dependencies:
```bash
npm install
```

2. Start backend:
```bash
cd backend
mvn spring-boot:run
```
Backend URL: `http://localhost:8080`

3. Start frontend in another terminal:
```bash
npm run dev
```
Frontend URL: `http://localhost:5173`

The Vite dev server proxies `/api/*` to `http://localhost:8080`.

## Demo Credentials

- Admin: `admin@university.edu` / `admin123`
- Student: `student@university.edu` / `student123`

## Backend API

- `GET /api/health`
- `POST /api/auth/login`

Request:
```json
{
  "email": "admin@university.edu",
  "password": "admin123"
}
```

Success response:
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "admin@university.edu",
    "name": "Dr. Priya Sharma",
    "role": "admin",
    "department": "Health Services"
  }
}
```
