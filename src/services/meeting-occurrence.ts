import MeetingOccurrence from '../models/meeting-occurrence'
import { MeetingOccurrenceData } from '../data/meeting-occurrence'

export const updateMeetingOccurrence = async (meetingOccurrence: MeetingOccurrence) => {
  try {
    return await MeetingOccurrenceData().update(meetingOccurrence)
  } catch(e) {
    throw new Error(e.message)
  }
}

export const getSingleMeetingOccurrence =  async (id: string) => {
  try {
    return  await MeetingOccurrenceData().getOne(id)
  }
  catch(e) {
    throw new Error(e.message)
  }
}

export const getAllMeetingOccurrences = async (teamId: string) => {
  try {
    return await MeetingOccurrenceData().getAll(teamId)
  }
  catch(e) {
    throw new Error(e.message)
  }
}
