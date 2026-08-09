# Frontend Dockerfile — Unforgotten India React/Vite SPA
# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci || npm install

# Copy source files
COPY . .

# Build argument for API base URL (defaults to /api/v1 for Nginx proxying)
ARG VITE_API_BASE_URL=/api/v1
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Run TypeScript check & Vite build
RUN node node_modules/typescript/bin/tsc --noEmit && node node_modules/vite/bin/vite.js build

# Stage 2: Production Web Server
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
