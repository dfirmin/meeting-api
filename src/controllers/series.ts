import { update, create as createSeries } from '../services/series'
import { create as createSection } from '../services/section'
import { create as createMeetingOccurrence } from '../services/meeting-occurrence'
import { RequestHandler } from 'express'
import createError from 'http-errors'
import Series from '../models/series'
import * as yup from 'yup'
import Section from '../models/section'

interface SeriesRequest {
  id: string
  userId: string
  timeAllocated: number
  startDate: string
  teamId: string
}
interface SectionRequest {
  id: string
  timeAllocated: number
  meetingSeriesId: string
  sectionTypeId: string
}

const seriesSchema = yup
  .object()
  .shape({
    series: yup.object<SeriesRequest>({
      id: yup.string().defined(),
      userId: yup.string().defined(),
      timeAllocated: yup.number().defined(),
      startDate: yup.string().defined(),
      teamId: yup.string().defined(),
    }),
    sections: yup.array().of(
      yup.object<SectionRequest>({
        id: yup.string().defined(),
        timeAllocated: yup.number().defined(),
        meetingSeriesId: yup.string().defined(),
        sectionTypeId: yup.string().defined(),
      }),
    ),
  })
  .defined()

export const createMeetingSeries: RequestHandler = async (req, res, next) => {
  try {
    await seriesSchema.validate(req.body, { abortEarly: false })
  } catch (e) {
    console.log(e)
    return next(createError(400, e.message))
  }

  try {
    const incomingMeetingSeries: SeriesRequest = req.body.series
    const incomingMeetingSections: SectionRequest[] = req.body.sections
    const newSeries: Series = {
      id: '0',
      user_id: incomingMeetingSeries.userId,
      time_allocated: incomingMeetingSeries.timeAllocated,
      start_date: incomingMeetingSeries.startDate,
      team_id: incomingMeetingSeries.teamId,
    }
    const meetingSeriesId: string = await createSeries(newSeries)

    incomingMeetingSections.map(async (section: SectionRequest) => {
      const newSection: Section = {
        id: '0',
        time_allocated: section.timeAllocated,
        meeting_series_id: meetingSeriesId,
        section_type_id: section.sectionTypeId,
      }
      await createSection(newSection)
    })
    const meetingOccurrenceId: string = await createMeetingOccurrence(meetingSeriesId)
    await res.status(200).json(meetingOccurrenceId)
  } catch (e) {
    return next(createError(500, e.message))
  }
}

export const updateMeetingSeries: RequestHandler = async (req, res, next) => {
  const meetingSeries: Series = req.body
  if (!meetingSeries.id || meetingSeries.id === '0') {
    next(createError(400, 'Missing user ID'))
  }
  try {
    await seriesSchema.validate(meetingSeries, { abortEarly: false })
  } catch (e) {
    console.log(e)
    return next(createError(400, e.message))
  }
  try {
    await update(meetingSeries)
    res.sendStatus(200).send(`Item modified with user ID: ${meetingSeries.id}`)
  } catch (e) {
    return next(createError(500, e.message))
  }
}
