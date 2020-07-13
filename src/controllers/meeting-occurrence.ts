// GET /meeting-occurrences/:id (Return meta information about the occurrence - date, time allocation, section occurrences, etc.)
// PUT /meeting-occurrences/:id (Store time spent on the occurrence)
// GET /meeting-occurrences?teamId=0
import { RequestHandler } from 'express'
import createError from 'http-errors'
import MeetingOccurrence from '../models/meeting-occurrence'
import { getOne, getAll as getAllMeetingOccurrences, update } from '../services/meeting-occurrence'
import SectionOccurrence from '../models/section-occurrence';
import { getAll as getAllSectionOccurrences }  from '../services/section-occurrence';


export const getMeetingOccurrence: RequestHandler = async (req, res, next) => {
  const meetingOccurrenceId: string = req.params.id
  // TODO - get meeting occurrence as well as section occurrences for a given meetingOccurrenceId
  // const dbErr = false
  // if (dbErr) {
  //   return next(createError(404, `No meeting occurrence with ID ${meetingOccurrenceId} was found`))
  // }
  try {
    const meetingOccurrence: MeetingOccurrence[] = await getOne(meetingOccurrenceId)
    if(meetingOccurrence && meetingOccurrence.length > 0){
      const filter = {
        seriesId: meetingOccurrence[0].meetingSeriesId,
        date: meetingOccurrence[0].date
      }
      const sectionOccurrences: SectionOccurrence[][] | null= await getAllSectionOccurrences(filter)
      return res.status(200).json({
        meetingOccurrence,
        sectionOccurrences
      })
    }
    
  }
  catch(e) {
    return next(createError())
  }
}

export const getMeetingOccurrences: RequestHandler = async (req, res, next) => {
  // if (teamId) {
  //   // TODO - Given that we have a teamId, we should attempt to fetch the most recent N occurrences from the database
  //   // TODO - If no records are found (meaning the teamId does not exist), how should we handle this?
  //   console.log(`Fetching meeting occurences for team with ID ${teamId}`)
  // }
  // TODO - how should we handle when no teamId is in the querystring?
  const teamId: string = req.query.teamId as string
  if (!teamId) {
    return next(createError(400, 'Missing teamId in querystring'))
  }
  try{
    const meetingOccurrences: MeetingOccurrence[][] = await getAllMeetingOccurrences(teamId)
    return res.status(200).json(meetingOccurrences)
  }
  catch(e){
    return next(createError(e))
  }
  
}

export const putMeetingOccurrence: RequestHandler = async (req, res, next) => {
  
  // TODO - Given the sectionId, update the section with a timeSpent in the database with that id
  const meetingOccurrence: MeetingOccurrence = req.body
  try{
    await update(meetingOccurrence)
    return res.status(200).send(`Meeting modified with ID: ${meetingOccurrence.id}`)
  }
  catch(e){
    return next(createError(e))
  }
}