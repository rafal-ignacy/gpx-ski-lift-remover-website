from typing import List
from .types import PointData
import math


class GpxAnalyzer:
    def __init__(self, points: List[PointData]):
        self.__points = points
        self.__downhill_points: List[PointData] = []
        self.__downhill_runs: List[List[PointData]] = []

    def degrees_to_radians(self, degrees: float) -> float:
        return degrees * (math.pi / 180)

    def calculate_distance(self, point1: PointData, point2: PointData) -> float:
        R = 6371
        delta_latitude = self.degrees_to_radians(point2.latitude - point1.latitude)
        delta_longitude = self.degrees_to_radians(point2.longitude - point1.longitude)
        a = (
            math.sin(delta_latitude / 2) ** 2
            + math.cos(self.degrees_to_radians(point1.latitude))
            * math.cos(self.degrees_to_radians(point2.latitude))
            * math.sin(delta_longitude / 2) ** 2
        )

        return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a)) * 1000

    def calculate_elevation_change(
        self, current_point: PointData, next_point: PointData
    ) -> float:
        return next_point.elevation - current_point.elevation

    def calculate_slope(self, elevation_change: float, distance: float) -> float:
        return (elevation_change / distance) * 100

    def is_downhill(self, current_point: PointData, next_point: PointData) -> bool:
        elevation_change = self.calculate_elevation_change(current_point, next_point)
        distance = self.calculate_distance(current_point, next_point)
        return distance > 0 and self.calculate_slope(elevation_change, distance) <= 0

    def is_point_in_run(self, distance: float) -> bool:
        return distance <= 100

    def has_run_exceeded_max_gap(self, distance: float) -> bool:
        return distance > 500

    def is_run_long_enough(self, run: List[PointData]) -> bool:
        return len(run) > 100

    def identify_downhill_points(self) -> None:
        self.__downhill_points = [
            point
            for index, point in enumerate(self.__points[:-1])
            if self.is_downhill(point, self.__points[index + 1])
        ]

    def extract_downhill_runs(self) -> None:
        current_run = []

        for i in range(len(self.__downhill_points) - 1):
            point = self.__downhill_points[i]
            next_point = self.__downhill_points[i + 1]
            distance = self.calculate_distance(point, next_point)

            if self.is_point_in_run(distance):
                current_run.append(point)
            elif self.has_run_exceeded_max_gap(distance) and self.is_run_long_enough(
                current_run
            ):
                self.__downhill_runs.append(current_run)
                current_run = []

        if self.is_run_long_enough(current_run):
            self.__downhill_runs.append(current_run)

    def get_downhill_points(self) -> List[PointData]:
        return [point for run in self.__downhill_runs for point in run]
