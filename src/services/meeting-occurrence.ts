import MeetingOccurrence from '../models/meeting-occurrence'
import { query } from '../db/index'

export const update = async (props: MeetingOccurrence) => {
  const updateQuery = `UPDATE meeting_occurrence
  SET date = $2, time_spent = $3, meeting_id = $4
  WHERE id = $1;`

  let updateValues = Object.values(props)
  query(updateQuery, updateValues)
    .catch((e) => {
      throw new Error(e)
    })
}


export const getAll = async (teamId: string): Promise<MeetingOccurrence[][]> => {
  const getQuery = `SElECT * FROM meeting_occurrence WHERE team_id  =  $1`
  const data: MeetingOccurrence[][] = await query(getQuery, [teamId])
    .then((res) => {
      return res.rows
    })
    .catch((e) => {
      throw new Error(e)
    })
  return data
}

export const getOne = async (id: string): Promise<MeetingOccurrence[]> => {
  const getQuery = `SElECT * FROM meeting_occurrence WHERE id = $1`
  const data: MeetingOccurrence[] = await query(getQuery, [id])
    .then((res) => {
      return res.rows[0]
    })
    .catch((e) => {
      throw new Error(e)
    })
  return data
}
