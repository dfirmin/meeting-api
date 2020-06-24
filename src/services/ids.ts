import knex from '../knex/database'
import Item from '../models/item'
const { idsData } = require('../data/ids-item')(knex)

export const createIds = async (ids: Item) => {
  
  try {
    return await idsData.create(ids)
  } catch(e) {
    throw new Error(e.message)
  }
}

export const updateIds = async (id: string, ids: Item) => {
  try {
    return await idsData.update(id, ids)
  } catch(e) {
    throw new Error(e.message)
  }
}