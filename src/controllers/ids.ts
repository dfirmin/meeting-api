// POST /ids (Create an IDS item - returns ID of the item)
// PUT /ids/:id (Update an IDS item - returns a success)
import { RequestHandler } from "express";
import createError from 'http-errors'
import * as yup from 'yup'
import { update, create } from '../services/ids'
import Item from '../models/item'

const itemSchema: yup.ObjectSchema<Item> = yup.object({
  id: yup
    .string()
    .defined(),
  description: yup
    .string()
    .defined(),
  priority: yup
    .number()
    .defined(),
  date_completed: yup
    .date()
    .nullable()
    .defined(),
  user_id: yup
    .number()
    .defined(),
  section_id: yup
    .number()
    .defined(),
  date_archived: yup
    .date()
    .nullable()
    .defined(),
  is_active: yup
    .bool()
    .defined()
}).defined();

export const postIds: RequestHandler = async (req, res, next) => {
  const ids: Item = req.body

  try {
    await itemSchema.validate(ids, {abortEarly: false})
  }
  catch(e) {
    console.log(e)
    return next(createError(400, e.message))
  }
  try {
    const IdsId: Item = await create(ids)
    res.status(201).json({ id: IdsId })
  }
  catch(e) {
    return next(createError(500, e.message))
  }
}

export const putIds: RequestHandler = async (req, res, next) => {
  const ids: Item = req.body

  if(!ids.id || ids.id === '0'){
    next(createError(400, 'Missing id'))
  }
  try {
    await itemSchema.validate(ids, {abortEarly: false})
  }
  catch(e) {
    console.log(e)
    return next(createError(400, e.message))
  }
  try {
    await update( ids)
    res.sendStatus(200).send(`Item modified with ID: ${ids.id}`)
  }
  catch(e) {
    return next(createError(500, e.message))
  }
}
