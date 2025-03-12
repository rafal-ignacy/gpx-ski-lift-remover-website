from typing import TypedDict
from datetime import datetime
from dataclasses import dataclass


@dataclass
class PointData:
    latitude: float
    longitude: float
    elevation: float
    time: datetime | None
