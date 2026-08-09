# ARCHITECTURE SPECIFICATION - UNFORGOTTEN INDIA

## 1. System Architecture Overview

Unforgotten India follows a clean, decoupled client-server architecture designed to deliver high-performance interactive cultural exploration without forcing premature infrastructure complexity.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          BROWSER CLIENT                                │
│  React 19 + TypeScript + Vite + Tailwind CSS v4                        │
│                                                                        │
│  [ Domain Types ]      [ API Client ]      [ App Shell ]               │
│  domain.ts             apiClient.ts        App.tsx                     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / REST (JSON)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                          FASTAPI BACKEND                               │
│  Python 3.12 + Pydantic v2 + Uvicorn                                   │
│                                                                        │
│  [ API Router ]        [ Domain Schemas ]   [ Core Settings ]          │
│  /api/v1/health        domain.py            config.py                  │
│                                health.py                               │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Future Persistence)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        DATA PERSISTENCE                                │
│  Phase 0/1: Structured JSON Fixtures & Dev Models                     │
│  Future: PostgreSQL + PostGIS (Geo-indexed State/Site Entities)        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Architecture

### 2.1 Component & Service Organization
- **`src/types/domain.ts`**: Client-side TypeScript contracts matching backend domain entities.
- **`src/services/apiClient.ts`**: Standardized HTTP fetch abstraction with typed error handling (`ApiError`).
- **`src/index.css`**: Design system tokens for Unforgotten India (parchment background, terracotta, deep saffron, indigo, slate ink typography).
- **`src/App.tsx`**: Lightweight foundation shell rendering backend API connection status.

### 2.2 Scalable Routing Strategy (Planned for Phase 1+)
The frontend exploration flow will rely on data-driven, dynamic routes:
- `/`: Landing Page
- `/explore`: Interactive India Map Gateway
- `/explore/:stateCode`: Regional Explorer (e.g. `/explore/IN-KA` for Karnataka)
- `/explore/:stateCode/:category`: Category Filter (`PEOPLE`, `MOVEMENTS`, `EVENTS`, `PLACES`, `STORIES`, `TIMELINE`)
- `/story/:storyId`: Interactive Story Experience

---

## 3. Backend Architecture

### 3.1 Layered Design
- **`app/main.py`**: Application factory, CORS middleware configuration, and lifecycle management.
- **`app/core/config.py`**: Environment settings loaded via Pydantic `BaseSettings`.
- **`app/schemas/`**: Pydantic models handling request/response serialization and domain validation.
- **`app/api/v1/`**: Versioned API router structure separating endpoint handlers cleanly.
- **`tests/`**: Pytest test suite validating API responses via FastAPI `TestClient`.

### 3.2 Current Active Endpoints
- `GET /`: API root metadata and navigation endpoints.
- `GET /api/v1/health`: System health status, version, and server timestamp.

---

## 4. Domain Data Model

### 4.1 Content Categories
All regional exploration is categorized across 6 domain pillars:
1. `PEOPLE`
2. `MOVEMENTS`
3. `EVENTS`
4. `PLACES`
5. `STORIES`
6. `TIMELINE`

### 4.2 Content Lifecycle Statuses
To support future publishing workflows, every entity supports lifecycle states:
- `DRAFT`: In-progress story/content submission.
- `PUBLISHED`: Verified and visible to public exploration.
- `ARCHIVED`: Historical record deactivated from primary discovery.

### 4.3 Content Classification System
Historical accuracy and oral folklore are explicitly segregated via classifications:
- `HISTORICAL_EVIDENCE`: Primary source documents, archaeological artifacts, peer-reviewed historiography.
- `HISTORICAL_DEBATE`: Scholarly disputed events, competing historical hypotheses.
- `FOLKLORE`: Regional myths, traditional legends, cultural allegories.
- `ORAL_TRADITION`: Passed-down oral histories and unwritten regional narratives.

### 4.4 AI Visual Reconstruction Disclaimer Contract
In `EvidenceSource` schema, the attribute `is_ai_reconstruction: bool` guarantees that AI-generated visual artist renders are marked at the data contract level and never confused with authentic archival photographs.

---

## 5. Future Integration Blueprints

### 5.1 AI Subsystem Integration Points (Post-Phase 1)
When AI functionality is integrated:
1. **Contextual Story Q&A**: FastAPI endpoint `/api/v1/ai/qa` passing story context into RAG pipelines.
2. **Semantic Content Discovery**: Vector embeddings stored alongside regional stories for cross-entity recommendation.
3. **Voice & Visual Generation**: Async task queue handling AI audio narration and historical scene reconstruction.

### 5.2 Community & Authentication Subsystem (Post-Phase 1)
Authentication is explicitly deferred until community features are introduced:
1. **Public Exploration**: Free, unauthenticated exploration for all visitors.
2. **Authenticated Features**: JWT-based authentication required ONLY for:
   - Story / Article submissions
   - Content moderation queue
   - Comments & community discussion
   - User bookmarks and reading lists

---

## 6. Deployment & Container Architecture

### 6.1 Development Topology
In local development, frontend and backend run as independent processes:

```text
Browser Client
   │
   ├── HTTP (Port 5173 / 5175) ──► Vite Dev Server (React 19 SPA)
   └── API (Port 8000) ─────────► Uvicorn ASGI Server (FastAPI API)
```

### 6.2 Docker Container Topology
In production Docker environments, Nginx acts as static asset server and API reverse proxy:

```text
Browser Client (Port 80)
   │
   ▼
Frontend Container (Nginx:alpine)
   ├── Static Build Assets (/usr/share/nginx/html)
   │     - Client-side routing handled via `try_files $uri $uri/ /index.html`
   └── Location /api/
         │
         ▼ (Docker Bridge Network)
Backend Container (Python 3.12: Uvicorn:8000)
   └── GET /api/v1/health
```

### 6.3 Security & Secret Handling Strategy
- **No Secrets in Code**: No API keys or tokens are stored in source code or Git history.
- **Frontend AI Key**: `VITE_GEMINI_API_KEY` is loaded at build/runtime via `.env.local` for client-side demo functionality.
- **Backend CORS**: Explicit origin whitelist configured in `app/core/config.py` preventing unauthorized origin access.

