// GET /action-items?userId=0&complete=false&isActive=true (Return Array of Action Items)
// POST /action-items (Create an action item - return the ID of the item)
// PUT /action-items/:id (update an action item - return 200 on success)
import { Request, Response } from "express";
import {updateActionItem, getAllActionItems, createActionItems} from '../services/action-item'



export const getActionItems = async (req: Request, res: Response) => {
  const filter = {
    userId: req.query.userId,
    completed: req.query.completed,
    isActive: req.query.isActive,
  }
  try {
    const actionItems: [] = await getAllActionItems(filter)
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

export const postActionItems = async (req: Request, res: Response) => {
  const actionItems: [] = req.body
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

export const putActionItem = (req: Request, res: Response) => {
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

export const getActionItem = () => {
  
}
