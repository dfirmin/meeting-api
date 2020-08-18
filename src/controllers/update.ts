import { RequestHandler } from 'express'
import createError from 'http-errors'
import * as yup from 'yup'
import { update, create, remove, getAll } from '../services/update'
import { Item, ItemRequest } from '../models/item'

const itemSchema: yup.ObjectSchema<ItemRequest> = yup
  .object({
    id: yup.string().defined(),
    description: yup.string().defined(),
    priority: yup.number().defined(),
    dateCompleted: yup.date().nullable().defined(),
    userId: yup.number().defined(),
    sectionId: yup.number().defined(),
    isActive: yup.bool().defined(),
  })
  .defined()

export const postUpdate: RequestHandler = async (req, res, next) => {
  try {
    await itemSchema.validate(req.body, { abortEarly: false })
  } catch (e) {
    console.log(e)
    return next(createError(400, e.message))
  }

  try {
    const incomingUpdateItem: ItemRequest = req.body
    const newUpdateItem: Item = {
      id: '0',
      description: incomingUpdateItem.description,
      priority: incomingUpdateItem.priority,
      date_completed: incomingUpdateItem.dateCompleted,
      user_id: incomingUpdateItem.userId,
      section_id: incomingUpdateItem.sectionId,
      is_active: incomingUpdateItem.isActive,
    }
    const updateId: Item = await create(newUpdateItem)
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
  try {
    await itemSchema.validate(req.body, { abortEarly: false })
  } catch (e) {
    console.log(e)
    return next(createError(400, e.message))
  }
  try {
    const incomingUpdateItem: ItemRequest = req.body
    if (!incomingUpdateItem.id || incomingUpdateItem.id === '0') {
      next(createError(400, 'Missing id'))
    }
    const updatedUpdateItem: Item = {
      id: incomingUpdateItem.id,
      description: incomingUpdateItem.description,
      priority: incomingUpdateItem.priority,
      date_completed: incomingUpdateItem.dateCompleted,
      user_id: incomingUpdateItem.userId,
      section_id: incomingUpdateItem.sectionId,
      is_active: incomingUpdateItem.isActive,
    }
    await update(updatedUpdateItem)
    res.sendStatus(200).send(`Item modified with ID: ${updatedUpdateItem.id}`)
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
