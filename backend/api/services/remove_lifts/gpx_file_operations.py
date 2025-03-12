import gpxpy
from typing import List
from .types import PointData


def read_gpx_content(file_content: bytes) -> gpxpy.gpx.GPX | None:
    try:
        gpx = gpxpy.parse(file_content)
    except gpxpy.gpx.GPXException as e:
        print(f"Error: Wrong format of GPX file: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error occured: {e}")
        return None
    return gpx


def parse_gpx_to_point_list(gpx: gpxpy.gpx.GPX) -> List[PointData]:
    return [
        PointData(
            latitude=point.latitude,
            longitude=point.longitude,
            elevation=point.elevation or 0.0,
            time=point.time if point.time else None,
        )
        for segment in gpx.tracks[0].segments
        for point in segment.points
    ]


def parse_point_list_to_gpx(points: List[PointData]) -> gpxpy.gpx.GPX:
    gpx = gpxpy.gpx.GPX()
    track = gpxpy.gpx.GPXTrack()
    gpx.tracks.append(track)
    segment = gpxpy.gpx.GPXTrackSegment()
    track.segments.append(segment)

    for point in points:
        gpx_point = gpxpy.gpx.GPXTrackPoint(
            latitude=point.latitude,
            longitude=point.longitude,
            elevation=point.elevation,
            time=point.time,
        )
        segment.points.append(gpx_point)

    return gpx
