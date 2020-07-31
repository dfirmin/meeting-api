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
    throw new Error(e)
  }
}

export const update = async (props: Item): Promise<void> => {
  try {
    const updateQuery = `UPDATE items
      SET description = $2, priority = $3, date_completed = $4, user_id = $5, section_id = $6, date_archived = $7, is_active = $8
      WHERE id = $1;`
    const updateValues = Object.values(props)
    await query(updateQuery, updateValues)
  } catch (e) {
    throw new Error(e)
  }
}

export const remove = async (id: string): Promise<void> => {
  try {
    const deleteQuery = `
    DELETE
    FROM items
    USING sections
    WHERE items.id = $1 AND sections.section_type_id = 1`
    const deleteValue = id
    await query(deleteQuery, [deleteValue])
  } catch (e) {
    throw new Error(e)
  }
}
