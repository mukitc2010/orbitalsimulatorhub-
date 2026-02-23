from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router as routes_router
from api.websocket import router as ws_router

app = FastAPI(title="Space-AGI Swarm Simulator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes_router, prefix="/api")
app.include_router(ws_router)
