import Section from '../models/section'
import { query } from '../db/index'

export const update = async (props: Section) => {
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

export const getAll = async (meetingSeriesId: string): Promise<Section[]> => {
  try {
    const getQuery = `SElECT * FROM sections WHERE meeting_series_id = $1`
    const data = await query(getQuery, [meetingSeriesId])
    return data.rows
  } catch (e) {
    throw new Error(e)
  }
}
