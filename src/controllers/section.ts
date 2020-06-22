import { RequestHandler } from 'express'
import createError from 'http-errors'
import Section from '../models/section'

// GET /sections?seriesId=0 (Returns Array of Sections - time allocated, name, items)
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
// PUT /sections/:sectionId (Update the section - return 200 on success)
