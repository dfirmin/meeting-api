//const knex = require('../knex/database');
import action_items from '../'

export const createActionItems = async (actionItems) => {
  try {
    return await action_item.create(actionItems)
  } catch(e) {
    throw new Error(e.message)
  }
}

export const updateActionItem = async (id: number) => {
  try {
    return await action_item.update(id)
  } catch(e) {
    throw new Error(e.message)
  }
}

export const getActionItem = async (id: number) => {
  try {
    return await action_item.findById(id)
  }
  catch(e) {
    throw new Error(e.message)
  }
}

export const getAllActionItems = async (filter: {userId: number, completed: boolean, isActive: boolean}) => {
  try {
    return await action_item.find(filter)
  }
  catch(e) {
    throw new Error(e.message)
  }
}
