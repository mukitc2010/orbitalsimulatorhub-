"""Qiskit quantum-assist service. Replace placeholder with real Qiskit later."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .schemas import QAssistRequest, QAssistResponse
from .qassist import quantum_assist_optimize

app = FastAPI(title="Qiskit Quantum Assist", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"ok": True, "service": "qiskit", "backend": "sim"}


@app.post("/qassist", response_model=QAssistResponse)
def qassist(req: QAssistRequest):
    """Optimize v0 via quantum-assist (placeholder)."""
    return quantum_assist_optimize(req)
