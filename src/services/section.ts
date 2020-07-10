import Section from '../models/section'
import { query } from '../db/index'

export const update = async (props: Section) => {
  const updateQuery = `UPDATE sections
  SET name = $2, priority = $3, time_allocated = $4, meeting_series_id = $5, order = $6
  WHERE id = $1;`

  let updateValues = Object.values(props)
  await query(updateQuery, updateValues)
    .catch(e => console.error(e.stack))
}

export const getAll = async (meetingSeriesId: string): Promise<Section[][]> => {
  const getQuery = `SElECT * FROM sections WHERE meeting_series_id = $1`
  const data: Section[][] = await query(getQuery, [meetingSeriesId])
    .then((res) => {
      return res.rows
    })
    .catch((e) => {
      console.log(e)
      return [] as Section[][]
    })
  return data
}

