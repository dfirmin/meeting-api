import { RequestHandler } from 'express'
import createError from 'http-errors'
import * as yup from 'yup'
import { update, create, remove, getAll } from '../services/ids'
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

export const postIds: RequestHandler = async (req, res, next) => {
  try {
    await itemSchema.validate(req.body, { abortEarly: false })
  } catch (e) {
    console.log(e)
    return next(createError(400, e.message))
  }
  try {
    const incomingIDS: ItemRequest = req.body
    const newIDS: Item = {
      id: '0',
      description: incomingIDS.description,
      priority: incomingIDS.priority,
      date_completed: incomingIDS.dateCompleted,
      user_id: incomingIDS.userId,
      section_id: incomingIDS.sectionId,
      is_active: incomingIDS.isActive,
    }
    const IdsId: Item = await create(newIDS)
    res.status(201).json({ id: IdsId })
  } catch (e) {
    return next(createError(500, e.message))
  }
}

export const getIds: RequestHandler = async (req, res, next) => {
  if (!req.query.meetingOccurrenceId) {
    return next(createError(400, 'Missing meetingOccurrenceId'))
  }
  const meetingOccurrenceId = req.query.meetingOccurrenceId as string
  try {
    const idsItems: Item[] = await getAll(meetingOccurrenceId)
    res.status(200).json(idsItems)
  } catch (e) {
    return next(createError(500, e.message))
  }
}

export const putIds: RequestHandler = async (req, res, next) => {
  try {
    await itemSchema.validate(req.body, { abortEarly: false })
  } catch (e) {
    console.log(e)
    return next(createError(400, e.message))
  }
  try {
    const incomingIDS: ItemRequest = req.body
    if (!incomingIDS.id || incomingIDS.id === '0') {
      next(createError(400, 'Missing id'))
    }
    const updatedIDS: Item = {
      id: incomingIDS.id,
      description: incomingIDS.description,
      priority: incomingIDS.priority,
      date_completed: incomingIDS.dateCompleted,
      user_id: incomingIDS.userId,
      section_id: incomingIDS.sectionId,
      is_active: incomingIDS.isActive,
    }
    await update(updatedIDS)
    res.sendStatus(200).send(`Item modified with ID: ${updatedIDS.id}`)
  } catch (e) {
    return next(createError(500, e.message))
  }
}

export const deleteIds: RequestHandler = async (req, res, next) => {
  if (!req.params.id) {
    return next(createError(400, 'Missing id'))
  }
  try {
    const idsId = req.params.id
    await remove(idsId)
    res.sendStatus(200).send(`Item removed with ID: ${idsId}`)
  } catch (e) {
    return next(createError(500, e.message))
  }
}
