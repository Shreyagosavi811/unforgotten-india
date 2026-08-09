from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime

class CategoryEnum(str, Enum):
    PEOPLE = "PEOPLE"
    MOVEMENTS = "MOVEMENTS"
    EVENTS = "EVENTS"
    PLACES = "PLACES"
    STORIES = "STORIES"
    TIMELINE = "TIMELINE"

class ContentStatusEnum(str, Enum):
    DRAFT = "DRAFT"
    PUBLISHED = "PUBLISHED"
    ARCHIVED = "ARCHIVED"

class ContentClassificationEnum(str, Enum):
    HISTORICAL_EVIDENCE = "HISTORICAL_EVIDENCE"
    HISTORICAL_DEBATE = "HISTORICAL_DEBATE"
    FOLKLORE = "FOLKLORE"
    ORAL_TRADITION = "ORAL_TRADITION"

class RegionBase(BaseModel):
    id: str
    name: str
    code: str
    capital: Optional[str] = None
    description: str
    available_categories: List[CategoryEnum]
    story_count: int = 0

class NarrativeSection(BaseModel):
    id: str
    heading: str
    content: str
    order: int

class EvidenceSource(BaseModel):
    id: str
    title: str
    citation: str
    archive_reference: Optional[str] = None
    url: Optional[str] = None
    is_ai_reconstruction: bool = False  # Mandatory disclaimer tag for AI visual reconstructions
    verification_notes: Optional[str] = None

class RelatedEntity(BaseModel):
    id: str
    name: str
    entity_type: str
    summary: str

class StoryBase(BaseModel):
    id: str
    title: str
    summary: str
    historical_context: str
    region_id: str
    category: CategoryEnum
    classification: ContentClassificationEnum
    status: ContentStatusEnum = ContentStatusEnum.DRAFT
    narrative_sections: List[NarrativeSection] = []
    evidence_sources: List[EvidenceSource] = []
    related_entities: List[RelatedEntity] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
