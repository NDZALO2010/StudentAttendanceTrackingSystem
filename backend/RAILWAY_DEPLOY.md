# Railway Deployment Troubleshooting Guide

## ✅ Pre-Deployment Checklist

### 1. Repository Structure
- [x] `backend/` folder contains all Django code
- [x] `backend/Procfile` exists with gunicorn command
- [x] `backend/railway.toml` exists with Python builder config
- [x] `backend/requirements.txt` has all dependencies including gunicorn

### 2. Environment Variables (Set in Railway Dashboard)
Required for production:
- `DATABASE_URL=postgresql://...` (from Neon)
- `DJANGO_SECRET_KEY=your-secure-key` (generate: `openssl rand -base64 32`)
- `DJANGO_DEBUG=False`
- `DJANGO_ALLOWED_HOSTS=your-railway-domain.up.railway.app` (Railway provides this)
- `CORS_ALLOWED_ORIGINS=https://your-netlify-site.netlify.app`
- `CSRF_TRUSTED_ORIGINS=https://your-netlify-site.netlify.app`

### 3. Railway Setup Steps
1. **Create new service** → Deploy from GitHub
2. **Select branch**: main
3. **After repo connects**:
   - Go to Settings tab
   - Set **Root Directory** to: `backend/`
   - Save and redeploy

### 4. Verify Build Success
- Check Railway logs: View deployment logs for Python build output
- Logs should show:
  ```
  Installing dependencies...
  [✓] Downloaded packages
  [✓] Building wheel for face_recognition
  [✓] Installing gunicorn
  ```

### 5. Post-Deployment Steps
- Once build succeeds and service is running:
  - Run migrations: In Railway shell OR via trigger endpoint
  - Collect static files (if needed): `python manage.py collectstatic --noinput`
  - Create superuser: `python manage.py createsuperuser` (in Railway shell)

## 🔍 Common Errors & Fixes

### Error: "railway.toml not found"
- **Fix**: Ensure `backend/railway.toml` exists at root of backend folder
- **Check**: `git ls-files | grep railway.toml` should show `backend/railway.toml`

### Error: "Missing dependencies (face_recognition, opencv)"
- **Fix**: These are in requirements.txt but may fail on Railway's Python builder
- **Alternative**: Comment them out if not essential for API, add later
- **Or**: Use Railway's node selector for compatibility

### Error: "WSGI application not found"
- **Fix**: Verify `DJANGO_SETTINGS_MODULE='myserver.settings'` in `wsgi.py`
- **Fix**: Ensure `myserver/settings.py` has no import errors

### Error: "Database connection refused"
- **Fix 1**: Verify `DATABASE_URL` is set and correct
- **Fix 2**: Test Neon connection manually: `psql <DATABASE_URL>`
- **Fix 3**: Ensure `dj-database-url` is in requirements.txt

### Error: "DEBUG=True detected"
- **Fix**: Set `DJANGO_DEBUG=False` in Railway env vars

## 🚀 Post-Deployment: Connect Frontend
1. Get Railway backend URL (shown in Railway dashboard as `your-app.up.railway.app`)
2. In Netlify dashboard → Site settings → Environment variables:
   - Set `REACT_APP_API_BASE=https://your-app.up.railway.app`
3. Redeploy Netlify
4. Test login: Visit your Netlify site and log in

## 📋 Verification Commands
Run these in Railway shell to verify:
```bash
python manage.py check                    # Check Django setup
python manage.py showmigrations           # Show migration status
python manage.py migrate --plan           # Plan migrations without running
```

## 📞 Need Help?
- **Railway logs**: Check deployment logs for specific errors
- **Test locally**: Run `python manage.py runserver` locally with production env vars
- **GitHub**: Ensure code is pushed to `main` branch
