import { RequestHandler } from 'express'
import createError from 'http-errors'
import Section from '../models/section'

export const getSections: RequestHandler = (req, res, next) => {
  const { seriesId } = req.query
  if (!seriesId) {
    return next(createError(400, 'Missing seriesId in querystring'))
  }
  // TODO - Given that we have a seriesId, we should attempt to fetch all sections for that series from the database
  // TODO - If no records are found (meaining the sectionId does not exist), how should we handle this?
  const seriesSections: Section[] = []
  return res.json(seriesSections)
}

export const updateSection: RequestHandler = (req, res, next) => {
  const sectionId: string = req.params.id
  // TODO - Given the sectionId, update the section in the database with that id
  const dbErr = false
  if (dbErr) {
    return next(createError(404, `No section with id ${sectionId} was found`))
  }
  return res.sendStatus(204)
}
