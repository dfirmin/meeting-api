import Section from '../models/section'
import { query } from '../db/index'

export const create = async (props: Section): Promise<number> => {
  try {
    const createQuery = `INSERT INTO sections (time_allocated, meeting_series_id, section_type_id) VALUES($1, $2, $3) RETURNING id`
    delete props.id
    const insertValues = Object.values(props)
    const data = await query(createQuery, insertValues)
    return data.rows[0].id
  } catch (e) {
    throw new Error(e.message)
  }
}
export const update = async (props: Section): Promise<void> => {
  try {
    const updateQuery = `UPDATE sections
      SET name = $2, priority = $3, time_allocated = $4, meeting_series_id = $5, order = $6
      WHERE id = $1;`
    const updateValues = Object.values(props)
    await query(updateQuery, updateValues)
  } catch (e) {
    throw new Error(e)
  }
}

export const getAll = async (meetingOccurrenceId: string): Promise<Section[]> => {
  try {
    const getQuery = `SELECT * FROM sections 
    WHERE meeting_series_id = (
    SELECT meeting_series.id 
    FROM meeting_series 
    INNER JOIN meeting_occurrences
    ON meeting_occurrences.meeting_series_id = meeting_series.id
    WHERE meeting_occurrences.id = $1)`

    const data = await query(getQuery, [meetingOccurrenceId])
    return data.rows
  } catch (e) {
    throw new Error(e)
  }
}
