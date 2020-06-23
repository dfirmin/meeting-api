import knex from '../knex/database'
import Item from '../models/item'
import IdsData from '../data/ids';

const db = new IdsData(knex)

export const createIds = async (ids: Item) => {
  
  try {
    return await db.create(ids)
  } catch(e) {
    throw new Error(e.message)
  }
}

export const updateIds = async (id: string, ids: Item) => {
  try {
    return await db.update(id, ids)
  } catch(e) {
    throw new Error(e.message)
  }
}