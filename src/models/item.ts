export interface Item {
  id: string
  description: string
  priority?: number
  date_completed: Date | null
  user_id: number
  section_id: number
  is_active: boolean
}

export interface ItemRequest {
  id: string
  description: string
  priority?: number
  dateCompleted: Date | null
  userId: number
  sectionId: number
  isActive: boolean
}
