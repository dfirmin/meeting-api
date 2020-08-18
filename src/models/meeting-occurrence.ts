export interface MeetingOccurrence {
  id: string
  date: Date
  time_spent?: number
  meeting_series_id: string
}

export interface MeetingOccurrenceRequest {
  id: string
  date: Date
  timeSpent?: number
  meetingSeriesId: string
}
