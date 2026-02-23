import msgpack
import time
from fastapi import APIRouter, WebSocket
from simulation.config import SimConfig
from simulation.simulation_loop import SimulationRunner

router = APIRouter()


@router.websocket("/ws/simulation")
async def ws_simulation(websocket: WebSocket):
    await websocket.accept()

    cfg = SimConfig()
    runner = SimulationRunner(cfg)

    try:
        while True:
            telem = runner.tick()

            now = time.time()
            if runner.should_emit(now):
                payload = msgpack.packb(telem, use_bin_type=True)
                await websocket.send_bytes(payload)
    except Exception:
        return
