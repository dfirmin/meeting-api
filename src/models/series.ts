interface Series {
  id: string
  admin_user_id: string
  time_allocated: number
  start_date: string
  team_id: string
}

interface SeriesRequest {
  timeAllocated: number
  startDate: Date
}

export default Series
