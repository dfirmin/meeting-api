import { RequestHandler } from 'express'
import createError from 'http-errors'
import * as yup from 'yup'
import { getAll as getAllSections, update, create } from '../services/section'
import { Section, SectionRequest } from '../models/section'

const sectionSchema: yup.ObjectSchema<SectionRequest> = yup
  .object({
    id: yup.string().defined(),
    timeAllocated: yup.number().defined(),
    meetingSeriesId: yup.string().defined(),
    sectionTypeId: yup.string().defined(),
  })
  .defined()

export const postSections: RequestHandler = async (req, res, next) => {
  try {
    await sectionSchema.validate(req.body, { abortEarly: false })
  } catch (e) {
    return next(createError(400, e.message))
  }
  try {
    const incomingSection: SectionRequest = req.body
    const newSection: Section = {
      id: '0',
      time_allocated: incomingSection.timeAllocated,
      meeting_series_id: incomingSection.meetingSeriesId,
      section_type_id: incomingSection.sectionTypeId,
    }
    const sectionId = await create(newSection)
    return res.status(200).json(sectionId)
  } catch (e) {
    return next(createError(500, e.message))
  }
}

export const getSections: RequestHandler = async (req, res, next) => {
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
  try {
    await sectionSchema.validate(req.body, { abortEarly: false })
  } catch (e) {
    console.log(e)
    return next(createError(400, e.message))
  }
  try {
    const incomingSection: SectionRequest = req.body
    if (!incomingSection.id || incomingSection.id === '0') {
      next(createError(400, 'Missing id'))
    }
    const updatedSection: Section = {
      id: incomingSection.id,
      time_allocated: incomingSection.timeAllocated,
      meeting_series_id: incomingSection.meetingSeriesId,
      section_type_id: incomingSection.sectionTypeId,
    }
    await update(updatedSection)
    return res.sendStatus(200).send(`Meeting modified with ID: ${updatedSection.id}`)
  } catch (e) {
    return next(createError(500, e.message))
  }
}
