import SectionOccurrence from '../models/section-occurrence'
import { query } from '../db/index'

// export const getAll = async (filter: { seriesId: string, date: Date }): Promise<SectionOccurrence[][]> => {
//   let getQuery = 'SElECT * FROM section_occurrences WHERE series_id = $1'
//   const getValues = []
//   getValues.push(filter.seriesId)

//   if(filter.date){
//     getQuery +=  'AND date = $2'
//     getValues.push(filter.date.toString())
//   }
//   const data: SectionOccurrence[][] = await query(getQuery, getValues)
//     .then((res) => {
//       return res.rows
//     })
//     .catch((e) => {
//       throw new Error(e)
//     })
//   return data
// }

export const getAll = async (meetingOccurrenceId: string): Promise<SectionOccurrence[]> => {
  try {
    const getQuery = `SELECT section_occurrences.id, section_id, date, created_at, updated_at, time_spent
                    FROM section_occurrences
                    WHERE section_id
                    IN (
                      SELECT sections.id
                      FROM sections
                      WHERE meeting_series_id = (
                        SELECT meeting_series.id
                        FROM meeting_series
                        INNER JOIN meeting_occurrences
                        ON meeting_occurrences.meeting_series_id = meeting_series.id
                        WHERE meeting_occurrences.id = $1))`
    const data = await query(getQuery, [meetingOccurrenceId])
    return data.rows
  } catch (e) {
    throw new Error(e)
  }
}
