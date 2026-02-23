# Space-AGI Swarm Simulator (Backend)

Research-grade swarm collision avoidance with J2 propagation, covariance, Pc, and OSQP control.

## Run

```bash
cd space-agi-swarm-backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# Unix: source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

- **Health:** http://localhost:8000/api/health
- **WebSocket:** ws://localhost:8000/ws/simulation
