// POST /updates (Create an update item - return the ID of the item)
// PUT /updates/:id (update an update item - return 200 on success)
import { RequestHandler } from "express";
import createError from 'http-errors'
import {updateUpdate, createUpdate} from '../services/update'
import Item from '../models/item'


export const postUpdate: RequestHandler = async (req, res, next) => {
  const update: Item = req.body
  try {
    const updateId: Item[] = await createUpdate(update)
    res.json({id: updateId})
  }
  catch(e) {
    return next(createError(500, e))
  }
}

export const putUpdate: RequestHandler = async (req, res, next) => {
  const update: Item = req.body
  try {
    await updateUpdate(update)
    res.sendStatus(200)
  }
  catch(e) {
    return next(createError())
  }
}