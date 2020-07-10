// POST /ids (Create an IDS item - returns ID of the item)
// PUT /ids/:id (Update an IDS item - returns a success)
import { RequestHandler } from "express";
import createError from 'http-errors'
import { update, create } from '../services/ids'
import Item from '../models/item'


export const postIds: RequestHandler = async (req, res, next) => {
  const ids: Item = req.body
  try {
    const IdsId: Item[] = await create(ids)
    res.json({ id: IdsId })
  }
  catch(e) {
    return next(createError())
  }
}

export const putIds: RequestHandler = async (req, res, next) => {
  const ids: Item = req.body
  try {
    await update( ids)
    res.sendStatus(200)
  }
  catch(e) {
    return next(createError())
  }
}
