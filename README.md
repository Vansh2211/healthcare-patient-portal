# healthcare-patient-portal

# Patient Document Portal (SQLite + TypeScript)

## Steps to Run

### 1. Backend

Backend runs on:  
 http://localhost:5000

---

### 2. Frontend

cd frontend
npm install
npm run dev

Frontend runs on:  
http://localhost:5173

---

## API Endpoints

| Method | URL               | Description   |
| ------ | ----------------- | ------------- |
| POST   | /documents/upload | Upload a PDF  |
| GET    | /documents        | List files    |
| GET    | /documents/:id    | Download file |
| DELETE | /documents/:id    | Delete file   |

---
