// GET /series/:teamId/occurrences (Return Array of Occurrences)
// GET /series/:seriesId/sections (Returns Array of Sections - time allocated, name, items)
// PUT /series/:seriesId/sections/:sectionId (Update the section - return 200 on success)
// * POST /series (Return the Created Series Object - including sections)
// * PUT /series/:id (Updates the record, returns 200 on success)
// get single series
import { update, create as createSeries } from '../services/series'
import { create as createSection } from '../services/section'
import { create as createMeetingOccurrence } from '../services/meeting-occurrence'
import { RequestHandler } from 'express'
import createError from 'http-errors'
import Series from '../models/series'
import * as yup from 'yup'
import Section from '../models/section'

const seriesSchema = yup
  .object()
  .shape({
    series: yup.object({
      id: yup.string().defined(),
      user_id: yup.string().defined(),
      time_allocated: yup.number().defined(),
      start_date: yup.string().defined(),
      team_id: yup.string().defined(),
    }),
    sections: yup.array(),
  })
  .defined()

export const createMeetingSeries: RequestHandler = async (req, res, next) => {
  try {
    await seriesSchema.validate(req.body, { abortEarly: false })
  } catch (e) {
    console.log(e)
    return next(createError(400, e.message))
  }
  const meetingSeries: Series = req.body.series
  const meetingSections: Section[] = req.body.sections
  try {
    const meetingSeriesId: string = await createSeries(meetingSeries)
    meetingSections.map(async (section) => {
      section.meeting_series_id = meetingSeriesId
      await createSection(section)
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
