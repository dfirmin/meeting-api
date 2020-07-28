// GET /series/:teamId/occurrences (Return Array of Occurrences)
// GET /series/:seriesId/sections (Returns Array of Sections - time allocated, name, items)
// PUT /series/:seriesId/sections/:sectionId (Update the section - return 200 on success)
// * POST /series (Return the Created Series Object - including sections)
// * PUT /series/:id (Updates the record, returns 200 on success)
// get single series
import { update, create } from '../services/series'
import { RequestHandler } from 'express'
import createError from 'http-errors'
import Series from '../models/series'
import * as yup from 'yup'

const seriesSchema: yup.ObjectSchema<Series> = yup
  .object({
    id: yup.string().defined(),
    admin_user_id: yup.string().defined(),
    time_allocated: yup.number().defined(),
    start_date: yup.string().defined(),
    team_id: yup.string().defined(),
  })
  .defined()

export const createMeetingSeries: RequestHandler = async (req, res, next) => {
  const meetingSeries: Series = req.body
  try {
    await seriesSchema.validate(meetingSeries, { abortEarly: false })
  } catch (e) {
    console.log(e)
    return next(createError(400, e.message))
  }
  try {
    const meetingSeriesId: string = await create(meetingSeries)
    res.status(201).json({ id: meetingSeriesId })
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
