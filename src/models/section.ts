export interface Section {
  id: string
  time_allocated: number
  meeting_series_id: string
  section_type_id: string
}

export interface SectionRequest {
  id: string
  timeAllocated: number
  meetingSeriesId: string
  sectionTypeId: string
}
