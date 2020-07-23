// GET /action-items?userId=0&complete=false&isActive=true (Return Array of Action Items)
// POST /action-items (Create an action item - return the ID of the item)
// PUT /action-items/:id (update an action item - return 200 on success)
import { RequestHandler } from 'express'
import createError from 'http-errors'
import * as yup from 'yup'
import { update, getAll, create } from '../services/action-item'
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

export const getActionItems: RequestHandler = async (req, res, next) => {
  if (!req.query.userId) {
    return next(createError(400, 'Missing userId'))
  }
  const filter = {
    userId: req.query.userId as string,
    completed: req.query.completed ? (req.query.completed as string) : 'false',
    isActive: req.query.isActive ? (req.query.isActive as string) : 'true',
  }
  try {
    const actionItems: Item[] = await getAll(filter)
    res.status(200).json(actionItems)
  } catch (e) {
    return next(createError(500, e.message))
  }
}

export const postActionItems: RequestHandler = async (req, res, next) => {
  const actionItems: Item = req.body

  try {
    await itemSchema.validate(actionItems, { abortEarly: false })
  } catch (e) {
    console.log(e)
    return next(createError(400, e.message))
  }
  try {
    const actionItemId: Item = await create(actionItems)
    res.status(201).json({ id: actionItemId })
  } catch (e) {
    return next(createError(500, e.message))
  }
}

export const putActionItem: RequestHandler = async (req, res, next) => {
  const actionItem: Item = req.body

  if (!actionItem.id || actionItem.id === '0') {
    next(createError(400, 'Missing id'))
  }
  try {
    await itemSchema.validate(actionItem, { abortEarly: false })
  } catch (e) {
    return next(createError(400, e.message))
  }
  try {
    await update(actionItem)
    res.sendStatus(200).send(`Item modified with ID: ${actionItem.id}`)
  } catch (e) {
    return next(createError(500, e.message))
  }
}
