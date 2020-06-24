// GET /series/:teamId/occurrences (Return Array of Occurrences)
// GET /series/:seriesId/sections (Returns Array of Sections - time allocated, name, items)
// PUT /series/:seriesId/sections/:sectionId (Update the section - return 200 on success)
// POST /series (Return the Created Series Object - including sections)
// PUT /series/:id (Updates the record, returns 200 on success)
import { RequestHandler } from 'express'
import createError from 'http-errors'
import Series from '../models/series'

export const getAllOccurences: RequestHandler = (req, res, next) => {
  const found = db.some((occurence) => occurence.id === parseInt(req.params.teamId))
  //"db is just a place holder. This is where I would want to query database/search database for the occurences."
  if (found) {
    const Occurences = db.filter((occurence) => occurence.id === parseInt(req.params.teamId))
    res.json(Occurences)
  } else {
    return next(createError(400, `No occurences for teamId of ${req.params.teamId}`))
  }
}

export const getSeriesSections: RequestHandler = (req, res, next) => {
  const seriesId = req.params.seriesId
  if (!seriesId) {
    return next(createError(400, 'Missing SeriesId'))
  }
  const SeriesSections: Series[] = []
  return res.json(SeriesSections)
}

//As aforementioned, "db", is supposed to reperesent the hookup to db via knex, etc..
export const updateSeriesSection: RequestHandler = (req, res, next) => {
  const found = db.some((section) => section.id === parseInt(req.params.sectionId))
  if (found) {
    const updSection = req.body
    db.forEach((section) => {
      if (section.id === parseInt(req.params.sectionId)) {
        //fields to be updated in target section of series
        res.json({ msg: 'Section updated!', section })
      }
    })
  } else {
    return next(createError(400, `No section with the id of ${req.params.sectionId}`))
  }
}

export const postSeries: RequestHandler = (req, res, next) => {}

export const updateRecord: RequestHandler = (req, res, next) => {}
