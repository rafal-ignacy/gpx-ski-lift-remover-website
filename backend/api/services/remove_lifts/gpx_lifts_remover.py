from .gpx_file_operations import (
    read_gpx_content,
    parse_gpx_to_point_list,
    parse_point_list_to_gpx,
)
from .gpx_analyzer import GpxAnalyzer
from .types import PointData

import logging
import gpxpy
from typing import List


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class GpxLiftsRemover:
    def remove_lifts(self, file: bytes) -> bytes:
        gpx_content: gpxpy.gpx.GPX | None = read_gpx_content(file)
        if gpx_content is None:
            raise Exception("Error: Wrong format of GPX file")
        points: List[PointData] = parse_gpx_to_point_list(gpx_content)

        gpx_analyzer = GpxAnalyzer(points)
        gpx_analyzer.identify_downhill_points()
        gpx_analyzer.extract_downhill_runs()
        filtered_points: List[PointData] = gpx_analyzer.get_downhill_points()

        parsed_points_to_gpx = parse_point_list_to_gpx(filtered_points)
        gpx_bytes = parsed_points_to_gpx.to_xml().encode("utf-8")
        return gpx_bytes
