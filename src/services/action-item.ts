import Item from '../models/item'
import { ActionItemData } from '../data/action-item'

export const createActionItems = async (actionItem: Item) => {
  
  try {
    return await ActionItemData().create(actionItem)
  } catch(e) {
    throw new Error(e.message)
  }
}

export const updateActionItem = async (actionItem: Item) => {
  try {
    return await ActionItemData().update(actionItem)
  } catch(e) {
    throw new Error(e.message)
  }
}

export const getActionItem = async (id: string) => {
  try {
    return await ActionItemData().getOne(id)
  }
  catch(e) {
    throw new Error(e.message)
  }
}

export const getAllActionItems = async (filter: { userId:string, completed:string, isActive:string }) => {
  try {
    return await ActionItemData().getAll(filter)
  }
  catch(e) {
    throw new Error(e.message)
  }
}
