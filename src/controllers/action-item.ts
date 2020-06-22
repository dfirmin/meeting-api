// GET /action-items?userId=0&complete=false&isActive=true (Return Array of Action Items)
// POST /action-items (Create an action item - return the ID of the item)
// PUT /action-items/:id (update an action item - return 200 on success)
import { RequestHandler } from "express";
import {updateActionItem, getAllActionItems, createActionItems} from '../services/action-item'
import Item from '../models/item'

export const getActionItems: RequestHandler = async (req, res) => {
  const filter = {
    userId: req.query.userId,
    completed: req.query.completed,
    isActive: req.query.isActive,
  }
  try {
    const actionItems: Item[] = await getAllActionItems(filter)
    res.json({
      ok: true,
      message: 'Success',
      actionItems

    })
  }
  catch(e) {
    console.log(e.message)
    res.sendStatus(500)
  }
}

export const postActionItems: RequestHandler = async (req, res) => {
  const actionItems: Item[] = req.body
  try {
    const actionItemId: number = await createActionItems(actionItems)
    //other service calls
    res.json({
      ok: true,
      message: 'Action Items Created',
      actionItemId
    })
  }
  catch(e) {
    console.log(e.message)
    res.sendStatus(500)
  }
}

export const putActionItem: RequestHandler = async (req, res) => {
  const actionItemId: number = req.param.id
  try {
    await updateActionItem(actionItemId)
    res.sendStatus(200)
  }
  catch(e) {
    console.log(e.message)
    res.sendStatus(500)
  }
}

export const getActionItem: RequestHandler = () => {

}
