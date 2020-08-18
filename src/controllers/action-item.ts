import { RequestHandler } from 'express'
import createError from 'http-errors'
import * as yup from 'yup'
import { update, getAllByUser, create, remove, getAll } from '../services/action-item'
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

export const getActionItems: RequestHandler = async (req, res, next) => {
  if (req.query.userId) {
    const filter = {
      userId: req.query.userId as string,
      completed: req.query.completed ? (req.query.completed as string) : 'false',
      isActive: req.query.isActive ? (req.query.isActive as string) : 'true',
    }
    try {
      const actionItems: Item[] = await getAllByUser(filter)
      res.status(200).json(actionItems)
    } catch (e) {
      return next(createError(500, e.message))
    }
  } else if (req.query.meetingOccurrenceId) {
    const meetingOccurrenceId = req.query.meetingOccurrenceId as string
    try {
      const actionItems: Item[] = await getAll(meetingOccurrenceId)
      res.status(200).json(actionItems)
    } catch (e) {
      return next(createError(500, e.message))
    }
  } else {
    return next(createError(400, 'Missing userId or meetingOccurrenceId'))
  }
}

export const postActionItems: RequestHandler = async (req, res, next) => {
  try {
    await itemSchema.validate(req.body, { abortEarly: false })
  } catch (e) {
    console.log(e)
    return next(createError(400, e.message))
  }
  try {
    const incomingActionItem: ItemRequest = req.body
    const newActionItem: Item = {
      id: '0',
      description: incomingActionItem.description,
      priority: incomingActionItem.priority,
      date_completed: incomingActionItem.dateCompleted,
      user_id: incomingActionItem.userId,
      section_id: incomingActionItem.sectionId,
      is_active: incomingActionItem.isActive,
    }
    const actionItemId: Item = await create(newActionItem)
    res.status(201).json({ id: actionItemId })
  } catch (e) {
    return next(createError(500, e.message))
  }
}

export const putActionItem: RequestHandler = async (req, res, next) => {
  try {
    await itemSchema.validate(req.body, { abortEarly: false })
  } catch (e) {
    return next(createError(400, e.message))
  }
  try {
    const incomingActionItem: ItemRequest = req.body
    if (!incomingActionItem.id || incomingActionItem.id === '0') {
      next(createError(400, 'Missing id'))
    }
    const updatedActionItem: Item = {
      id: incomingActionItem.id,
      description: incomingActionItem.description,
      priority: incomingActionItem.priority,
      date_completed: incomingActionItem.dateCompleted,
      user_id: incomingActionItem.userId,
      section_id: incomingActionItem.sectionId,
      is_active: incomingActionItem.isActive,
    }
    await update(updatedActionItem)
    res.sendStatus(200).send(`Item modified with ID: ${updatedActionItem.id}`)
  } catch (e) {
    return next(createError(500, e.message))
  }
}

export const deleteActionItem: RequestHandler = async (req, res, next) => {
  if (!req.params.id) {
    return next(createError(400, 'Missing id'))
  }
  try {
    const actionItemId = req.params.id
    await remove(actionItemId)
    res.sendStatus(200).send(`Item removed with ID: ${actionItemId}`)
  } catch (e) {
    return next(createError(500, e.message))
  }
}
