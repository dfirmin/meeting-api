import knex from '../knex/database'
import Item from '../models/item'
import UpdateData from '../data/update';

const db = new UpdateData(knex)

export const createUpdate = async (update: Item) => {
  
  try {
    return await db.create(update)
  } catch(e) {
    throw new Error(e.message)
  }
}

export const updateUpdate = async (id: string, update: Item) => {
  try {
    return await db.update(id, update)
  } catch(e) {
    throw new Error(e.message)
  }
}