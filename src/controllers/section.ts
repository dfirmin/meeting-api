import { RequestHandler } from 'express'
import createError from 'http-errors'
import * as yup from 'yup'
import { getAll as getAllSections, update, create } from '../services/section'
import Section from '../models/section'

const sectionSchema: yup.ObjectSchema<Section> = yup
  .object({
    id: yup.string().defined(),
    time_allocated: yup.number().defined(),
    meeting_series_id: yup.string().defined(),
    section_type_id: yup.string().defined(),
  })
  .defined()

export const postSections: RequestHandler = async (req, res, next) => {
  const section = req.body
  try {
    await sectionSchema.validate(section, { abortEarly: false })
  } catch (e) {
    return next(createError(400, e.message))
  }
  try {
    const sectionId = await create(section)
    return res.status(200).json(sectionId)
  } catch (e) {
    return next(createError(500, e.message))
  }
}

export const getSections: RequestHandler = async (req, res, next) => {
  // TODO - Given that we have a seriesId, we should attempt to fetch all sections for that series from the database
  // TODO - If no records are found (meaining the sectionId does not exist), how should we handle this?
  const meetingOccurrenceId = req.query.meetingOccurrenceId as string
  if (!meetingOccurrenceId) {
    return next(createError(400, 'Missing meetingOccurrenceId in querystring'))
  }
  try {
    const seriesSections: Section[] = await getAllSections(meetingOccurrenceId)
    console.log(seriesSections)
    return res.status(200).json(seriesSections)
  } catch (e) {
    return next(createError(500, e.message))
  }
}

export const putSection: RequestHandler = async (req, res, next) => {
  const section: Section = req.body

  if (!section.id || section.id === '0') {
    next(createError(400, 'Missing id'))
  }
  try {
    await sectionSchema.validate(section, { abortEarly: false })
  } catch (e) {
    console.log(e)
    return next(createError(400, e.message))
  }
  try {
    await update(section)
    return res.sendStatus(200).send(`Meeting modified with ID: ${section.id}`)
  } catch (e) {
    return next(createError(500, e.message))
  }
}
