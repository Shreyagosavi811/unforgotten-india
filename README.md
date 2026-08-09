# Unforgotten India

> An evidence-aware digital museum and historical exploration platform dedicated to uncovering, contextualising, and preserving India's rich cultural, regional, and human narratives.

---

## What It Is

**Unforgotten India** transforms regional history into a museum-grade digital discovery experience. Rather than serving static blog posts or generic summaries, the platform combines an authentic SVG/GeoJSON geographic layer with structured story domain models, evidence classification frameworks, chronological timelines, and an embedded AI historical interpreter.

Every story is explicitly grounded in verified historical records, academic monographs, official archive documents, or documented oral traditions — with clear distinction between verified fact, scholarly debate, and traditional folklore.

---

## Core Features

*   **Authentic India Map**: High-precision interactive SVG map of Indian states and union territories supporting ISO `IN-*` region standards.
*   **Regional Explorer**: Rich editorial gateways for individual regions featuring curated categories (`PEOPLE`, `PLACES`, `EVENTS`, `MOVEMENTS`, `STORIES`, `TIMELINE`).
*   **Story Discovery Engine**: Searchable and filterable directory (`/stories`) allowing visitors to filter by region, category, and evidence classification.
*   **Chronological Timelines**: Integrated chronological milestones embedded directly within story reading experiences.
*   **"Ask the Story" AI Assistant**: Context-bounded AI historical interpreter embedded in story pages. Receives ONLY approved story content to answer visitor questions without hallucinating facts or URLs. Includes a grounded deterministic fallback when no API key is set.
*   **Evidence Classification Framework**: Transparent metadata badges distinguishing `HISTORICAL_EVIDENCE`, `HISTORICAL_DEBATE`, `FOLKLORE`, and `ORAL_TRADITION`.
*   **AI Reconstruction Disclaimer**: Enforced data-level contracts (`is_ai_reconstruction`) ensuring AI-generated visual artist renders are never misrepresented as archival photographs.

---

## System Architecture

```text
Local Development:

┌────────────────────────────────────────┐       HTTP       ┌────────────────────────────────────────┐
│            REACT SPA CLIENT            │ ───────────────► │            FASTAPI BACKEND             │
│  React 19 + TypeScript + Vite + Tailwind│  localhost:8000 │  Python 3.12 + Pydantic v2 + Uvicorn   │
│  Port: 5173                            │ ◄─────────────── │  /api/v1/health                        │
└────────────────────────────────────────┘                  └────────────────────────────────────────┘

Docker Production Setup:

┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       DOCKER COMPOSE NETWORK                                        │
│                                                                                                     │
│   Browser (Port 80)                                                                                 │
│      │                                                                                              │
│      ▼                                                                                              │
│   ┌────────────────────────────────────┐       Proxy /api/       ┌──────────────────────────────┐   │
│   │     FRONTEND CONTAINER (Nginx)     │ ──────────────────────► │  BACKEND CONTAINER (FastAPI) │   │
│   │  Static React SPA + SPA Fallback   │                         │  Port 8000                   │   │
│   └────────────────────────────────────┘                         └──────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Technical Stack

| Layer | Technology | Key Libraries |
|---|---|---|
| **Frontend Framework** | React 19 (TypeScript 6.0) | `react-router-dom` v7 |
| **Build Tooling** | Vite 8.2 | `@vitejs/plugin-react` |
| **Styling & UI** | Tailwind CSS v4 | `@tailwindcss/vite`, Vanilla CSS Design Tokens |
| **Mapping & Geo** | D3 Geo & react-simple-maps | Authentic India GeoJSON Runtime Layer |
| **Backend API** | FastAPI 0.110 | Python 3.12 |
| **Data Validation** | Pydantic v2 | `pydantic-settings` |
| **API Server** | Uvicorn | Async ASGI server |
| **AI Integration** | Google Gemini API (gemini-1.5-flash) | Deterministic Grounded Fallback Provider |
| **Testing** | Vitest (Frontend) & Pytest (Backend) | `httpx` TestClient |
| **Containerisation** | Docker & Docker Compose | Nginx multi-stage build |

---

## Project Structure

```text
unforgotten-india/
├── .github/
│   └── workflows/ci.yml       # GitHub Actions CI pipeline
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── india/         # India map & regional selectors
│   │   │   ├── landing/       # Museum editorial landing components
│   │   │   ├── regional/      # Regional explorer sections
│   │   │   └── story/         # Story renderer, EvidencePanel, StoryTimeline, StoryAssistant
│   │   ├── data/
│   │   │   ├── regions.ts     # ISO region registry
│   │   │   └── stories/       # Curated story repositories (MH, WB, RJ, UP, TN, KL)
│   │   ├── pages/             # Route pages (Home, India, Regional, Story, Discovery)
│   │   ├── services/
│   │   │   ├── apiClient.ts   # Backend API client
│   │   │   └── ai/            # Bounded AI context builder & Gemini provider
│   │   └── types/             # TypeScript domain models
│   ├── Dockerfile             # Multi-stage Nginx production build
│   └── nginx.conf             # Production Nginx SPA & API proxy configuration
├── backend/
│   ├── app/
│   │   ├── api/v1/            # FastAPI API routers & health checks
│   │   ├── core/              # Environment & CORS configuration
│   │   ├── schemas/           # Pydantic domain models
│   │   └── main.py            # FastAPI application factory
│   ├── tests/                 # Pytest suite
│   └── Dockerfile             # Python 3.12 Uvicorn container build
├── docker-compose.yml         # Container orchestration configuration
├── DOCKER.md                  # Comprehensive Docker documentation
├── ARCHITECTURE.md            # Technical domain specification
└── README.md                  # Repository guide
```

---

## Local Development Setup

### 1. Prerequisites
*   Node.js 20+ (Node.js 22 recommended)
*   Python 3.12+

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv
# On Windows: .venv\Scripts\activate
# On Linux/macOS: source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run backend unit tests
python -m pytest

# Start development API server (Port 8000)
python -m uvicorn app.main:app --reload --port 8000
```

Backend endpoints:
*   API Health: `http://localhost:8000/api/v1/health`
*   Swagger Docs: `http://localhost:8000/api/v1/docs`

### 3. Frontend Setup

```bash
cd frontend

# Install Node dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Run TypeScript type check
node node_modules/typescript/bin/tsc --noEmit

# Run Vitest test suite
node node_modules/vitest/vitest.mjs run

# Start Vite development server (Port 5173 / 5175)
npm run dev
```

App opens at `http://localhost:5173` (or port indicated by Vite).

---

## Docker Deployment

To run the complete full-stack environment in Docker:

```bash
# Build and launch containers
docker compose up --build -d

# Verify container status
docker compose ps

# View logs
docker compose logs -f
```

Access Points:
*   **Web Application**: [http://localhost](http://localhost)
*   **Backend API**: [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health)

To stop services:
```bash
docker compose down
```

For full details, see [DOCKER.md](DOCKER.md).

---

## Environment Variables

| Variable | Scope | Description | Default / Example |
|---|---|---|---|
| `VITE_API_BASE_URL` | Frontend | Base path for backend API requests | `http://localhost:8000/api/v1` (Dev) / `/api/v1` (Docker) |
| `VITE_GEMINI_API_KEY` | Frontend | Optional Google Gemini API key | Omitted (uses grounded fallback) |
| `ENVIRONMENT` | Backend | Environment flag | `development` |

> **Security Note**: `VITE_*` environment variables are bundled into frontend client code. They are suitable for MVP development and public demonstration APIs. For enterprise deployments, AI proxy endpoints can be routed through FastAPI.

---

## Testing

### Frontend Suite (56 tests)
```bash
cd frontend
node node_modules/vitest/vitest.mjs run
```

### Backend Suite (2 tests)
```bash
cd backend
python -m pytest
```

---

## Historical Integrity & Classification

Unforgotten India strictly enforces an evidence classification policy:

1. **`HISTORICAL_EVIDENCE`**: Accounts verified by primary archival documents, inscriptions, or peer-reviewed historical literature.
2. **`HISTORICAL_DEBATE`**: Events or interpretations subject to ongoing academic debate among historians.
3. **`FOLKLORE`**: Regional legends, myths, and allegories preserved for their cultural value.
4. **`ORAL_TRADITION`**: Unwritten oral histories transmitted across generations.

The system prompt for the AI assistant explicitly instructs the model to preserve these distinctions and never present folklore or oral tradition as verified historical fact.

---

## Current MVP Status

*   [x] **Landing Page & Navigation**: Editorial layout with museum design system.
*   [x] **Interactive India Map**: authentic GeoJSON rendering with canonical ISO region IDs.
*   [x] **Regional Explorer**: Active discovery hubs for Maharashtra (`IN-MH`), West Bengal (`IN-WB`), Rajasthan (`IN-RJ`), Tamil Nadu (`IN-TN`), Kerala (`IN-KL`), and Uttar Pradesh (`IN-UP`).
*   [x] **Curated Story Engine**: 10 evidence-grounded stories complete with narrative sections, evidence panels, citations, and chronological timelines.
*   [x] **"Ask the Story" AI Assistant**: Context-bounded AI assistant with Gemini provider & deterministic fallback.
*   [x] **Stories Discovery Index**: `/stories` route with full-text search and multi-tag filtering.
*   [x] **Docker & Deployment**: Multi-stage Nginx + Uvicorn Docker Compose configuration.

---

## License & Attribution

Developed as a museum-grade digital heritage project. All historical source citations are documented within individual story evidence panels.
