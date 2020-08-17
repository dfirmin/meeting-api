// POST /updates (Create an update item - return the ID of the item)
// PUT /updates/:id (update an update item - return 200 on success)
import { RequestHandler } from 'express'
import createError from 'http-errors'
import * as yup from 'yup'
import { update, create, remove, getAll } from '../services/update'
import Item from '../models/item'

const itemSchema: yup.ObjectSchema<Item> = yup
  .object({
    id: yup.string().defined(),
    description: yup.string().defined(),
    priority: yup.number().defined(),
    date_completed: yup.date().nullable().defined(),
    user_id: yup.number().defined(),
    section_id: yup.number().defined(),
    is_active: yup.bool().defined(),
  })
  .defined()

export const postUpdate: RequestHandler = async (req, res, next) => {
  const updateItem: Item = req.body

  try {
    await itemSchema.validate(updateItem, { abortEarly: false })
  } catch (e) {
    console.log(e)
    return next(createError(400, e.message))
  }

  try {
    const updateId: Item = await create(updateItem)
    res.status(201).json({ id: updateId })
  } catch (e) {
    return next(createError(500, e.message))
  }
}

export const getUpdates: RequestHandler = async (req, res, next) => {
  if (!req.query.meetingOccurrenceId) {
    return next(createError(400, 'Missing meetingOccurrenceId'))
  }
  const meetingOccurrenceId = req.query.meetingOccurrenceId as string
  try {
    const updateItems: Item[] = await getAll(meetingOccurrenceId)
    res.status(200).json(updateItems)
  } catch (e) {
    return next(createError(500, e.message))
  }
}

export const putUpdate: RequestHandler = async (req, res, next) => {
  const updateItem: Item = req.body

  if (!updateItem.id || updateItem.id === '0') {
    next(createError(400, 'Missing id'))
  }
  try {
    await itemSchema.validate(update, { abortEarly: false })
  } catch (e) {
    console.log(e)
    return next(createError(400, e.message))
  }
  try {
    await update(updateItem)
    res.sendStatus(200).send(`Item modified with ID: ${updateItem.id}`)
  } catch (e) {
    return next(createError(500, e.message))
  }
}

export const deleteUpdate: RequestHandler = async (req, res, next) => {
  if (!req.params.id) {
    return next(createError(400, 'Missing id'))
  }
  try {
    const updateId = req.params.id
    await remove(updateId)
    res.sendStatus(200).send(`Item removed with ID: ${updateId}`)
  } catch (e) {
    return next(createError(500, e.message))
  }
}
