import SectionOccurrence from '../models/section-occurrence';
import { query } from '../db/index'

export const getAll = async (filter: { seriesId: string, date: Date }): Promise<SectionOccurrence[][]> => {
  let getQuery = `SElECT * FROM section_occurrences WHERE series_id = $1`
  const getValues = []
  getValues.push(filter.seriesId)

  if(filter.date){
    getQuery +=  'AND date = $2'
    getValues.push(filter.date.toString())
  }
  const data: SectionOccurrence[][] = await query(getQuery, getValues)
    .then((res) => {
      return res.rows
    })
    .catch((e) => {
      throw new Error(e)
    })
  return data
}