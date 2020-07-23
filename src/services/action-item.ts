import Item from '../models/item'
import { query } from '../db/index'

export const create = async (props: Item): Promise<Item> => {
  try {
    const createQuery = `INSERT INTO items
      (description, priority, date_completed, user_id, section_id, date_archived, is_active)
      VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id`
    delete props.id
    const insertValues: string[] = Object.values(props)
    const data = await query(createQuery, insertValues)
    return data.rows[0]
  } catch (e) {
    throw new Error(e.message)
  }
}

export const update = async (props: Item): Promise<void> => {
  try {
    const updateQuery = `UPDATE items
      SET description = $2, priority = $3, date_completed = $4, user_id = $5, section_id = $6, date_archived = $7, is_active = $8
      WHERE id = $1;`
    const updateValues: string[] = Object.values(props)
    await query(updateQuery, updateValues)
  } catch (e) {
    throw new Error(e.message)
  }
}

export const getAll = async (filter: { userId: string; completed: string; isActive: string }): Promise<Item[]> => {
  try {
    let getQuery = 'SElECT * FROM items WHERE user_id = $1 AND section_id = 2'
    const getValues: string[] = []
    getValues.push(filter.userId)

    if (filter.completed === 'true') {
      getQuery += ' AND date_completed != null'
    }
    if (filter.isActive === 'false') {
      getQuery += ' AND is_active = false'
    }
    const data = await query(getQuery, getValues)
    return data.rows
  } catch (e) {
    throw new Error(e.message)
  }
}

export const getOne = async (id: string): Promise<Item> => {
  try {
    const getQuery = `SElECT * FROM items WHERE id = $1`
    const data = await query(getQuery, [id])
    return data.rows[0]
  } catch (e) {
    throw new Error(e.message)
  }
}
