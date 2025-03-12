from fastapi import FastAPI
from api.routers import remove_lifts

app = FastAPI()

app.include_router(remove_lifts.router)
