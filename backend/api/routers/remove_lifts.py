from fastapi import APIRouter, UploadFile, File, Response
from ..services.remove_lifts.gpx_lifts_remover import GpxLiftsRemover

router = APIRouter()


@router.post("/remove-lifts")
async def remove_lifts(file: UploadFile = File(...)):
    if file.content_type != "application/gpx+xml":
        return {"error": "Invalid file type"}

    gpx_lifts_remover = GpxLiftsRemover()
    try:
        removed_lifts_gpx_bytes = gpx_lifts_remover.remove_lifts(file.file.read())
    except Exception as e:
        return {"error": str(e)}
    return Response(
        content=removed_lifts_gpx_bytes,
        media_type="application/gpx+xml",
        headers={"Content-Disposition": "attachment; filename=filtered.gpx"},
    )
