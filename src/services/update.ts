import Item from '../models/item'
import { UpdateData } from '../data/update'

export const createUpdate = async (ids: Item) => {
  
  try {
    return await UpdateData().create(ids)
  } catch(e) {
    throw new Error(e.message)
  }
}

export const updateUpdate = async (ids: Item) => {
  try {
    return await UpdateData().update(ids)
  } catch(e) {
    throw new Error(e.message)
  }
}