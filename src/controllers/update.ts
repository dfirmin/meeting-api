// POST /updates (Create an update item - return the ID of the item)
// PUT /updates/:id (update an update item - return 200 on success)
import { RequestHandler } from "express";
import createError from 'http-errors'
import {updateUpdate, createUpdate} from '../services/update'
import Item from '../models/item'


export const postUpdate: RequestHandler = async (req, res, next) => {
  const update: Item[] = req.body
  try {
    const updateId: string = await createUpdate(update)
    res.json({
      ok: true,
      message: 'Update Created',
      updateId
    })
  }
  catch(e) {
    return next(createError(404, `An error has occured`))
  }
}

export const putUpdate: RequestHandler = async (req, res, next) => {
  const updateId: string = req.params.id
  const update: Item = req.body
  try {
    await updateUpdate(updateId, update)
    res.sendStatus(200)
  }
  catch(e) {
    return next(createError(404, `An error has occured`))
  }
}