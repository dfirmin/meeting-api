import knex from '../knex/database'
import Item from '../models/item'
const actionItemData = require('../data/action-item')(knex)

export const createActionItems = async (actionItem: Item) => {
  
  try {
    return await actionItemData.create(actionItem)
  } catch(e) {
    throw new Error(e.message)
  }
}

export const updateActionItem = async (id: string, actionItem: Item) => {
  try {
    return await actionItemData.update(id, actionItem)
  } catch(e) {
    throw new Error(e.message)
  }
}

export const getActionItem = async (id: string) => {
  try {
    return await actionItemData.findById(id)
  }
  catch(e) {
    throw new Error(e.message)
  }
}

export const getAllActionItems = async (filter: {}) => {
  try {
    return await actionItemData.find(filter)
  }
  catch(e) {
    throw new Error(e.message)
  }
}
