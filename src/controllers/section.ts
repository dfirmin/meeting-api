import { RequestHandler } from 'express'
import createError from 'http-errors'
import { getAllSections, updateSection } from '../services/section'
import Section from '../models/section'

export const getSections: RequestHandler = async (req, res, next) => {
  // TODO - Given that we have a seriesId, we should attempt to fetch all sections for that series from the database
  // TODO - If no records are found (meaining the sectionId does not exist), how should we handle this?
  const seriesId = req.query.seriesId as string
  if (!seriesId) {
    return next(createError(400, 'Missing seriesId in querystring'))
  }
  try {
    const seriesSections: Section[][] = await getAllSections(seriesId)
    return res.json(seriesSections)
  }
  catch(e) {
    return next(createError(e))
  }
}

export const putSection: RequestHandler = async (req, res, next) => {
  const section: Section = req.body
  // TODO - Given the sectionId, update the section in the database with that id
  try {
    await updateSection(section)
    return res.sendStatus(200)
  }
  catch(err) {
    return next(createError())
  }
  
}
