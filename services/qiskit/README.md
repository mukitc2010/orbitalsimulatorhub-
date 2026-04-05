# Qiskit Quantum Assist Service

Placeholder service for quantum-assisted trajectory optimization. Replace with real Qiskit (QAOA, VQE, etc.) later.

## Endpoints

- `GET /health` — Health check
- `POST /qassist` — Optimize v0 (body: `QAssistRequest` with M, r0, v0, horizon_margin, tidal_limit, fuel_budget, search_deltas, backend)

## Run locally

```bash
cd services/qiskit
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

## Docker

```bash
docker build -t qiskit-qassist .
docker run -p 8001:8000 qiskit-qassist
```

## Environment

```
QASSIST_URL=http://localhost:8000
```

## Integration

The Quantum Space AGI simulator can call this service instead of the built-in placeholder. Set `QASSIST_URL` in `.env` to point to this service (default: `http://localhost:8000`).
