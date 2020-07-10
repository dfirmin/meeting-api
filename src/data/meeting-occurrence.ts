import MeetingOccurrence from '../models/meeting-occurrence';
import { query } from '../db/index'

interface IMeetingOccurrenceData {
  update: (props: MeetingOccurrence) => void
  getAll: (teamId: string) => Promise<MeetingOccurrence[][]>
  getOne: (id: string) => Promise<MeetingOccurrence[]>
}

export const MeetingOccurrenceData = (): IMeetingOccurrenceData => {
  
  const update = async (props: MeetingOccurrence) => {
    const updateQuery = `UPDATE meeting_occurrence
    SET date = $2, time_spent = $3, meeting_id = $4
    WHERE id = $1;`

    let updateValues = Object.values(props)
    query(updateQuery, updateValues)
      .catch(e => console.error(e.stack))
  }

  
  const getAll = async (teamId: string) => {
    const getQuery = `SElECT * FROM meeting_occurrence WHERE team_id  =  $1`
    const data: MeetingOccurrence[][] = await query(getQuery, [teamId])
      .then((res) => {
        return res.rows
      })
      .catch((e) => {
        console.log(e)
        return [] as MeetingOccurrence[][]
      })
    return data
  }

  const getOne = async (id: string) => {
    const getQuery = `SElECT * FROM meeting_occurrence WHERE id = $1`
    const data: MeetingOccurrence[] = await query(getQuery, [id])
      .then((res) => {
        return res.rows[0]
      })
      .catch((e) => {
        console.log(e)
        return [] as MeetingOccurrence[]
      })
    return data
  }
  
  return {
    update,
    getAll,
    getOne
  }
}