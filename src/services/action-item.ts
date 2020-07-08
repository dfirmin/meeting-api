import Item from '../models/item'
import { ActionItemData } from '../data/action-item'
import pool from ''

export const createActionItems = async (actionItem: Item) => {
  
  try {
    return await ActionItemData(pool).create(actionItem)
  } catch(e) {
    throw new Error(e.message)
  }
}

export const updateActionItem = async (actionItem: Item) => {
  try {
    return await ActionItemData(pool).update(actionItem)
  } catch(e) {
    throw new Error(e.message)
  }
}

export const getActionItem = async (id: string) => {
  try {
    return await ActionItemData(pool).getOne(id)
  }
  catch(e) {
    throw new Error(e.message)
  }
}

export const getAllActionItems = async (filter: {}) => {
  try {
    return await ActionItemData(pool).getAll()
  }
  catch(e) {
    throw new Error(e.message)
  }
}
