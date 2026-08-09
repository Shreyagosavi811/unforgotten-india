# Docker Deployment Guide — Unforgotten India

This document describes how to build, run, and manage **Unforgotten India** in a containerised production environment using Docker and Docker Compose.

---

## Architecture Overview

In Docker mode, the application runs as two orchestrated containers on a shared bridge network:

```text
Browser
  │
  │ HTTP (Port 80)
  ▼
Frontend Container (Nginx)
  ├── Static React SPA Assets (/usr/share/nginx/html)
  └── /api/* Proxy Pass ─────────► Backend Container (FastAPI:8000)
                                      └── /api/v1/health
```

*   **Frontend**: Multi-stage Docker build producing an `nginx:alpine` image serving the built React/Vite SPA with SPA fallback handling for client-side routes (`/india`, `/stories`, `/story/:slug`).
*   **Backend**: Python 3.12 slim container running Uvicorn serving FastAPI REST endpoints.

---

## Prerequisites

*   **Docker Engine**: 24.0+
*   **Docker Compose**: v2.20+

---

## Quick Start with Docker Compose

### 1. Build and Start Services

```bash
docker compose up --build -d
```

### 2. Verify Running Services

```bash
docker compose ps
```

Expected output:
*   `unforgotten-india-backend`: Healthy (`http://localhost:8000/api/v1/health`)
*   `unforgotten-india-frontend`: Running (`http://localhost:80`)

### 3. Access Application

*   **Web App**: [http://localhost](http://localhost)
*   **Backend API**: [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health)
*   **API Docs (Swagger)**: [http://localhost:8000/api/v1/docs](http://localhost:8000/api/v1/docs)

---

## Useful Commands

### View Logs
```bash
# Follow all logs
docker compose logs -f

# View backend logs only
docker compose logs -f backend

# View frontend logs only
docker compose logs -f frontend
```

### Stop Services
```bash
docker compose down
```

### Rebuild Specific Service
```bash
docker compose build frontend
docker compose up -d frontend
```

---

## Environment Variables

| Variable | Container | Description | Default |
|---|---|---|---|
| `VITE_API_BASE_URL` | Frontend | Base path for backend API requests | `/api/v1` |
| `VITE_GEMINI_API_KEY` | Frontend | Optional key for AI Assistant | *(Omitted — uses fallback)* |
| `ENVIRONMENT` | Backend | Application environment | `production` |

---

## Troubleshooting

### Port Conflicts
If port 80 or 8000 is already in use on your host machine:
Edit `docker-compose.yml` to remap external ports, e.g.:
```yaml
ports:
  - "8080:80"   # Access frontend at http://localhost:8080
```

### Route 404s on Refresh
Nginx is configured with `try_files $uri $uri/ /index.html;` inside `/etc/nginx/conf.d/default.conf`. Direct loads on nested routes (e.g. `/india/IN-MH`) automatically serve `index.html`.
