import knex from '../knex/database'
import Item from '../models/item'
const { updateData } = require('../data/update')(knex)

export const createUpdate = async (update: Item) => {
  
  try {
    return await updateData.create(update)
  } catch(e) {
    throw new Error(e.message)
  }
}

export const updateUpdate = async (id: string, update: Item) => {
  try {
    return await updateData.update(id, update)
  } catch(e) {
    throw new Error(e.message)
  }
}