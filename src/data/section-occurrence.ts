import { query } from '../db/index'
import SectionOccurrenceData from '../models/meeting-occurrence';
import SectionOccurrence from '../models/section-occurrence';


interface ISectionOccurrenceData {
  getAll: (filter: {seriesId:string, date:Date}) => Promise<SectionOccurrence[][]>
}

export const SectionOccurrenceData = (): ISectionOccurrenceData => {

  const getAll = async (filter: { seriesId: string, date: Date }) => {
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
        console.log(e)
        return [] as SectionOccurrence[][]
      })
    return data
  }
  
  return{
    getAll,
  }
}