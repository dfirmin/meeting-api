import knex from '../knex/database'
import Item from '../models/item'
import ActionItemData from '../data/action_item';

const db = new ActionItemData(knex)

export const createActionItems = async (actionItem: Item) => {
  
  try {
    return await db.create(actionItem)
  } catch(e) {
    throw new Error(e.message)
  }
}

export const updateActionItem = async (id: string, actionItem: Item) => {
  try {
    return await db.update(id, actionItem)
  } catch(e) {
    throw new Error(e.message)
  }
}

export const getActionItem = async (id: string) => {
  try {
    return await db.findById(id)
  }
  catch(e) {
    throw new Error(e.message)
  }
}

export const getAllActionItems = async (filter: {userId: string, completed: string, isActive: string}) => {
  try {
    return await db.find(filter)
  }
  catch(e) {
    throw new Error(e.message)
  }
}
