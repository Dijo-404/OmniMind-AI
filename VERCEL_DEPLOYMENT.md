# Vercel Deployment Guide

This repository is configured so the frontend can be deployed from repo root on Vercel.

## What Deploys to Vercel

- Frontend: Next.js app in `frontend/`
- Backend: FastAPI app should be deployed separately (Render, Railway, Fly.io, VM, or container host)

## Required Environment Variables (Vercel Project)

Set these in Vercel project settings:

- `NEXT_PUBLIC_API_URL` = your backend base URL (example: `https://api.your-domain.com`)

Optional:

- `NEXT_PUBLIC_APP_NAME` if you add app branding via env later

## Backend CORS Requirements

Backend already allows:

- Localhost development origins
- `https://omnimind-ai.vercel.app`
- Any Vercel preview domain via regex: `https://.*.vercel.app`

If you use a custom frontend domain, add it to backend `ALLOWED_ORIGINS`.

## Deploy Steps

1. Push this repository to GitHub.
2. In Vercel, create a new project from this repo.
3. Keep project root as repository root.
4. Vercel will use `vercel.json` and build the frontend from `frontend/`.
5. Add `NEXT_PUBLIC_API_URL` in Vercel environment variables.
6. Deploy.

## Verification After Deploy

1. Open deployed frontend URL.
2. Submit a query in the UI.
3. Confirm network calls go to `${NEXT_PUBLIC_API_URL}/api/...`.
4. Confirm websocket connects to `${NEXT_PUBLIC_API_URL}` with `ws/wss` conversion.
5. Confirm backend `/health` responds from public internet.

## Local Production Simulation

From `frontend/`:

```bash
npm run build
npm run start
```

This matches the Vercel production build path.
