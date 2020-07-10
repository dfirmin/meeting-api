import { SectionOccurrenceData } from '../data/section-occurrence'

export const getAllSectionOccurrences = async (filter: { seriesId: string, date: Date }) => {
  try {
    return await SectionOccurrenceData().getAll(filter)
  } catch(e) {
    throw new Error(e.message)
  }
}