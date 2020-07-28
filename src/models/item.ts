export default interface Item {
  id: string
  description: string
  priority?: number
  date_completed: Date | null
  user_id: number
  section_id: number
  is_active: boolean
}
