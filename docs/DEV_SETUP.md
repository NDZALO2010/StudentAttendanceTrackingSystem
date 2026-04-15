# Dev Setup & Restore Checklist

This document contains the exact commands used to get the project running, plus a short recovery checklist in case the virtual environment or login stops working.

---

## 1) Prerequisites

- Windows (this repo was tested on Windows).
- Python 3.10 (or compatible).
- PostgreSQL accessible on `localhost` (default port 5432).

---

## 2) Create / rebuild the virtualenv (restore checklist)

If the existing `venv` breaks or points to a missing Python, run:

```powershell
# 1) Delete or rename old venv if needed
Remove-Item -Recurse -Force .\venv

# 2) Create a new venv using your installed Python
C:\Users\ndzal\AppData\Local\Programs\Python\Python310\python.exe -m venv venv

# 3) Activate it
.\venv\Scripts\Activate.ps1

# 4) Upgrade pip and install requirements
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

> If you prefer a different Python path, replace the `C:\Users\ndzal\AppData\Local\Programs\Python\Python310\python.exe` path with your own.

---

## 3) Ensure Postgres driver is installed (needed for Django)

From the activated venv:

```powershell
python -m pip install psycopg2-binary
```

---

## 4) Run Django migrations (first time or after DB reset)

```powershell
python manage.py migrate
```

---

## 5) Run the development server

```powershell
python manage.py runserver
```

---

## 6) Restore/reset the admin login (if login breaks)

### a) Generate a Django password hash (in the venv)

```powershell
python manage.py shell -c "from django.contrib.auth.hashers import make_password; print(make_password('TestPass123'))"
```

### b) Update the password hash in the database (safe method)

A helper script exists in `scripts/set_admin_password.py`. Run it from the repo root:

```powershell
python scripts\set_admin_password.py
```

> This script updates the `admin` account password to:
> - **Username:** `admin`
> - **Password:** `TestPass123`

---

## 7) Notes / Troubleshooting

- If `manage.py` reports `No module named 'django'`, you are not running inside the correct venv.
- If `psql` is not found, make sure PostgreSQL is installed and its `bin` directory is on your PATH.
- If you ever need to recreate the DB from scratch, drop and re-create `EdT`, then rerun `python manage.py migrate`.

---

## 8) Helpful files

- `scripts/set_admin_password.py` — updates admin password hash directly in the DB.
- `requirements.txt` — Python dependency list.
