// GET /action-items?userId=0&complete=false&isActive=true (Return Array of Action Items)
// POST /action-items (Create an action item - return the ID of the item)
// PUT /action-items/:id (update an action item - return 200 on success)
import { RequestHandler } from "express";
import createError from 'http-errors'
import {updateActionItem, getAllActionItems, createActionItems} from '../services/action-item'
import Item from '../models/item'

export const getActionItems: RequestHandler = async (req, res, next) => {
  const filter = {
    userId: req.query.userId as string,
    completed: req.query.completed as string,
    isActive: req.query.isActive as string,
  }
  try {
    const actionItems: Item[][] = await getAllActionItems(filter)
    res.json(actionItems)
  }
  catch(e) {
    return next(createError(e))
  }
}

export const postActionItems: RequestHandler = async (req, res, next) => {
  const actionItems: Item = req.body
  try {
    const actionItemId: Item[] | void = await createActionItems(actionItems)

    res.json({ id: actionItemId })
  }
  catch(e) {
    return next(createError(e))
  }
}

export const putActionItem: RequestHandler = async (req, res, next) => {
  const actionItem: Item = req.body
  try {
    await updateActionItem(actionItem)
    res.sendStatus(200)
  }
  catch(e) {
    return next(createError(e))
  }
}

export const getActionItem: RequestHandler = () => {

}
