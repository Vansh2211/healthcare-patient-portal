# Design Document – Patient Document Portal (SQLite + TypeScript)

## 1. Tech Stack Choices

### Frontend

React + Vite  
Reason: fast dev server, easy to implement file upload UI.

### Backend

Node.js + Express + TypeScript  
Reason: type-safety, clean code, ideal for API development.

### Database

SQLite  
Reason: simple file-based DB, no setup required, perfect for small project.

### Scaling to 1000 users

- Switch SQLite → PostgreSQL
- Files stored on AWS S3 instead of uploads/
- Add authentication (JWT)
- Add pagination for listing documents
- Deploy backend using Docker

---

## 2. Architecture

---

## 3. API Specification

### POST /documents/upload

Uploads a PDF file.

### GET /documents

Returns list of all uploaded files.

### GET /documents/:id

Downloads a file.

### DELETE /documents/:id

Deletes file + metadata.

---

## 4. Data Flow (upload & download)

### Upload

1. User selects PDF
2. React sends FormData
3. Backend stores PDF in `/uploads`
4. Metadata inserted into SQLite
5. Response sent back

### Download

1. User clicks download
2. Frontend opens backend URL
3. Backend reads file and streams it

---

## 5. Assumptions

- Only one user (no authentication)
- Only PDF files allowed
- Max file size: ~10 MB
- SQLite file stored locally
