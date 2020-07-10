import Section from '../models/section'
import { SectionData } from '../data/section'

export const updateSection = async (section: Section) => {
  try {
    return await SectionData().update(section)
  } catch(e) {
    throw new Error(e.message)
  }
}

export const getAllSections = async (meetingSeriesId: string) => {
  try {
    return await SectionData().getAll(meetingSeriesId)
  }
  catch(e) {
    throw new Error(e.message)
  }
}
