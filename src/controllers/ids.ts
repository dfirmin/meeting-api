// POST /ids (Create an IDS item - returns ID of the item)
// PUT /ids/:id (Update an IDS item - returns a success)
import { RequestHandler } from "express";
import createError from 'http-errors'
import {updateIds, createIds} from '../services/ids'
import Item from '../models/item'


export const postIds: RequestHandler = async (req, res, next) => {
  const ids: Item = req.body
  try {
    const actionItemId: string = await createIds(ids)
    res.json({
      ok: true,
      message: 'IDS Created',
      ids
    })
  }
  catch(e) {
    return next(createError(404, `An error has occured`))
  }
}

export const putIds: RequestHandler = async (req, res, next) => {
  const idsId: string = req.params.id
  const ids: Item = req.body
  try {
    await updateIds(idsId, ids)
    res.sendStatus(200)
  }
  catch(e) {
    return next(createError(404, `An error has occured`))
  }
}
