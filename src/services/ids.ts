import Item from '../models/item'
import { IdsData } from '../data/ids'

export const createIds = async (ids: Item) => {
  
  try {
    return await IdsData().create(ids)
  } catch(e) {
    throw new Error(e.message)
  }
}

export const updateIds = async (ids: Item) => {
  try {
    return await IdsData().update(ids)
  } catch(e) {
    throw new Error(e.message)
  }
}