import { RequestHandler } from 'express'
import createError from 'http-errors'
import * as yup from 'yup'
import { MeetingOccurrence, MeetingOccurrenceRequest } from '../models/meeting-occurrence'
import SectionOccurrence from '../models/section-occurrence'
import { getOne, getAll as getAllMeetingOccurrences, update } from '../services/meeting-occurrence'
import { getAll as getAllSectionOccurrences } from '../services/section-occurrence'

const meetingOccurrenceSchema: yup.ObjectSchema<MeetingOccurrenceRequest> = yup
  .object({
    id: yup.string().defined(),
    date: yup.date().defined(),
    timeSpent: yup.number().defined(),
    meetingSeriesId: yup.string().defined(),
  })
  .defined()

export const getMeetingOccurrence: RequestHandler = async (req, res, next) => {
  try {
    const meetingOccurrenceId: string = req.params.id
    const meetingOccurrence: MeetingOccurrence = await getOne(meetingOccurrenceId)
    if (meetingOccurrence) {
      const sectionOccurrences: SectionOccurrence[] = await getAllSectionOccurrences(meetingOccurrenceId)
      return res.status(200).json({
        meetingOccurrence,
        sectionOccurrences,
      })
    } else {
      return next(createError(404, `No meeting occurrence with ID ${meetingOccurrenceId} was found`))
    }
  } catch (e) {
    return next(createError(500, e.message))
  }
}

export const getMeetingOccurrences: RequestHandler = async (req, res, next) => {
  const teamId: string = req.query.teamId as string
  if (!teamId) {
    return next(createError(400, 'Missing teamId in querystring'))
  }
  try {
    const meetingOccurrences: MeetingOccurrence[] = await getAllMeetingOccurrences(teamId)
    return res.status(200).json(meetingOccurrences)
  } catch (e) {
    return next(createError(500, e.message))
  }
}

export const putMeetingOccurrence: RequestHandler = async (req, res, next) => {
  try {
    await meetingOccurrenceSchema.validate(req.body, { abortEarly: false })
  } catch (e) {
    console.log(e)
    return next(createError(400, e.message))
  }
  try {
    const incomingMeetingOccurrence: MeetingOccurrenceRequest = req.body
    if (!incomingMeetingOccurrence.id || incomingMeetingOccurrence.id === '0') {
      next(createError(400, 'Missing id'))
    }
    const updatedMeetingOccurrence: MeetingOccurrence = {
      id: incomingMeetingOccurrence.id,
      date: incomingMeetingOccurrence.date,
      time_spent: incomingMeetingOccurrence.timeSpent,
      meeting_series_id: incomingMeetingOccurrence.meetingSeriesId,
    }
    await update(updatedMeetingOccurrence)
    return res.status(200).send(`Meeting modified with ID: ${updatedMeetingOccurrence.id}`)
  } catch (e) {
    return next(createError(500, e.message))
  }
}
