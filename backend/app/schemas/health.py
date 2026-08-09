from pydantic import BaseModel, Field

class HealthCheck(BaseModel):
    status: str = Field(..., json_schema_extra={"example": "ok"})
    service: str = Field(..., json_schema_extra={"example": "Unforgotten India API"})
    version: str = Field(..., json_schema_extra={"example": "0.1.0"})
    timestamp: str = Field(..., json_schema_extra={"example": "2026-08-09T10:00:00Z"})
    environment: str = Field(..., json_schema_extra={"example": "development"})
