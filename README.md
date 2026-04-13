# EdTrack3

This repository is now organized as a **3-tier architecture**:

- **Presentation tier (frontend)**: React application running on `localhost:3000`
- **Application tier (backend)**: Django REST API running on `localhost:5000`
- **Data tier**: Django models + SQLite (or optional Postgres) stored in `backend/db.sqlite3`

---

## Running the project (development)

### 1) Start the backend (API server)

```bash
cd backend
python -m venv .venv   # optional: create a virtualenv
.\.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 5000
```

The backend will run on `http://localhost:5000` and expose REST endpoints under `/api/`.

### 2) Start the frontend (React app)

```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000` and will proxy API calls to the backend.

---

## Notes

- API calls are handled by `frontend/src/services/api.js` and use a consistent JSON response format.
- Backend CORS is configured to accept requests from `http://localhost:3000`.
- Environment variables can be set via `backend/.env` (see `backend/.env.example`).

---

## Existing Features

The existing AI face recognition attendance flow is still supported via the backend API.

> If you want to run the legacy Django HTML templates instead of the React frontend, you can still visit the Django routes directly (e.g., `http://localhost:5000/login/`).
