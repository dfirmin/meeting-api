import { MeetingOccurrence } from '../models/meeting-occurrence'
import { query } from '../db/index'

export const create = async (meetingSeriesId: string): Promise<string> => {
  try {
    const createQuery = `INSERT INTO meeting_occurrences (meeting_series_id) VALUES($1) RETURNING id`
    const data = await query(createQuery, [meetingSeriesId])
    return data.rows[0].id
  } catch (e) {
    throw new Error(e.message)
  }
}

export const update = async (props: MeetingOccurrence): Promise<void> => {
  try {
    const updateQuery = `UPDATE meeting_occurrences
      SET date = $2, time_spent = $3, meeting_id = $4
      WHERE id = $1;`
    const updateValues = Object.values(props)
    await query(updateQuery, updateValues)
  } catch (e) {
    throw new Error(e.message)
  }
}

export const getAll = async (teamId: string): Promise<MeetingOccurrence[]> => {
  try {
    const getQuery = `SElECT * FROM meeting_occurrences 
      INNER JOIN meeting_series ON meeting_series.id = meeting_occurrences.meeting_series_id 
      WHERE team_id  =  $1`
    const data = await query(getQuery, [teamId])
    return data.rows
  } catch (e) {
    throw new Error(e.message)
  }
}

export const getOne = async (id: string): Promise<MeetingOccurrence> => {
  try {
    const getQuery = 'SElECT * FROM meeting_occurrences WHERE id = $1'
    const data = await query(getQuery, [id])
    return data.rows[0]
  } catch (e) {
    throw new Error(e.message)
  }
}
