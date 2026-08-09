from fastapi import APIRouter
from datetime import datetime, timezone
from app.schemas.health import HealthCheck
from app.core.config import settings

router = APIRouter()

@router.get("/health", response_model=HealthCheck, summary="API Health Check")
def get_health() -> HealthCheck:
    """
    Health check endpoint returning system status, API version, and timestamp.
    """
    return HealthCheck(
        status="ok",
        service=settings.PROJECT_NAME,
        version=settings.VERSION,
        timestamp=datetime.now(timezone.utc).isoformat(),
        environment=settings.ENVIRONMENT,
    )
