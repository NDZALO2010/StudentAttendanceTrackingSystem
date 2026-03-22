# Technology Stack

This project is built as a three-tier application, using modern web technologies on both the frontend and backend.

## 🧩 Backend (Application + Data)

- **Python 3 / Django** – The core web framework used for backend routing, ORM, authentication, and serving REST APIs.
- **Django REST Framework (DRF)** – Provides API serialization, viewsets, authentication, and a clean JSON REST API layer.
- **SQLite (default)** – Lightweight file-based database used for development/testing (`backend/db.sqlite3`).
- **PostgreSQL (optional)** – Supported alternative for production deployments when a more robust RDBMS is required.
- **face_recognition / dlib / OpenCV** – Python libraries used to detect and encode faces for the attendance face-recognition flow.

## 🧠 Frontend (Presentation)

- **React** – Single-page application (SPA) framework used for the UI and client routing.
- **Create React App** – The build/config tooling that scaffolds the React project and provides the development server.
- **Axios (via `frontend/src/services/api.js`)** – Used for JSON API calls to the backend.

## 🌐 Integration / Runtime

- **CORS** – Backend is configured to allow requests from `http://localhost:3000` so the React app can call the Django API.
- **REST API (JSON)** – Backend exposes endpoints under `/api/` that the frontend consumes.

## 🧰 Dev Tooling / Environment

- **Python virtualenv** – Recommended to isolate backend Python dependencies (`backend/.venv`).
- **npm / Node.js** – Used to manage frontend dependencies and run the React dev server.

---

> Note: Legacy Django HTML templates remain available and can be accessed directly (e.g., `http://localhost:5000/login/`) if you want to bypass the React frontend.