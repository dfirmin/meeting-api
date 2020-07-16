// GET /series/:teamId/occurrences (Return Array of Occurrences)
// GET /series/:seriesId/sections (Returns Array of Sections - time allocated, name, items)
// PUT /series/:seriesId/sections/:sectionId (Update the section - return 200 on success)
// * POST /series (Return the Created Series Object - including sections)
// * PUT /series/:id (Updates the record, returns 200 on success)
import { update, create } from '../services/series'
import { RequestHandler } from 'express'
import createError from 'http-errors'
import Series from '../models/series'
import * as yup from 'yup'

const seriesSchema: yup.ObjectSchema<Series> = yup
  .object({
    adminUserId: yup.string().defined(),
    timeAllocated: yup.number().defined(),
    startDate: yup.string().defined(),
    teamId: yup.string().defined(),
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
    const meetingSeriesId: Series[] | void = await create(meetingSeries)
    res.status(201).json({ id: meetingSeriesId })
  } catch (e) {
    return next(createError(500, e.message))
  }
}

export const updateMeetingSeries: RequestHandler = async (req, res, next) => {
  const meetingSeries: Series = req.body
  if (!meetingSeries.adminUserId || meetingSeries.adminUserId === '0') {
    next(createError(400, 'Missing admin user id'))
  }
  try {
    await seriesSchema.validate(meetingSeries, { abortEarly: false })
  } catch (e) {
    console.log(e)
    return next(createError(400, e.message))
  }
  try {
    await update(meetingSeries)
    res.sendStatus(200).send(`Item modified with admin user ID: ${meetingSeries.adminUserId}`)
  } catch (e) {
    return next(createError(500, e.message))
  }
}
