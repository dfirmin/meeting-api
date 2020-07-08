// GET /action-items?userId=0&complete=false&isActive=true (Return Array of Action Items)
// POST /action-items (Create an action item - return the ID of the item)
// PUT /action-items/:id (update an action item - return 200 on success)
import { RequestHandler } from "express";
import createError from 'http-errors'
import {updateActionItem, getAllActionItems, createActionItems} from '../services/action-item'
import Item from '../models/item'
import { QueryResult } from "pg";

export const getActionItems: RequestHandler = async (req, res, next) => {
  const filter = {
    userId: req.query.userId,
    completed: req.query.completed,
    isActive: req.query.isActive,
  }
  try {
    const actionItems: QueryResult<Item> = await getAllActionItems(filter)
    res.json({
      ok: true,
      message: 'Success',
      actionItems

    })
  }
  catch(e) {
    return next(createError(404, `An error has occured`))
  }
}

export const postActionItems: RequestHandler = async (req, res, next) => {
  const actionItems: Item = req.body
  try {
    const actionItemId: string = await createActionItems(actionItems)

    res.json({
      ok: true,
      message: 'Action Items Created',
      actionItemId
    })
  }
  catch(e) {
    return next(createError(404, `An error has occured`))
  }
}

export const putActionItem: RequestHandler = async (req, res, next) => {
  const actionItemId: string = req.params.id
  const actionItem: Item = req.body
  try {
    await updateActionItem(actionItem)
    res.sendStatus(200)
  }
  catch(e) {
    return next(createError(404, `An error has occured`))
  }
}

export const getActionItem: RequestHandler = () => {

}
