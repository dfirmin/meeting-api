import Item from '../models/item'
import { query } from '../db/index'

export const create = async (props: Item): Promise<Item>=> {
  try {
    const createQuery: string = `INSERT INTO items 
      (description, priority, date_completed, user_id, section_id, date_archived, is_active)
      VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
    delete props.id
    let insertValues: string[] = Object.values(props)
    const data = await query(createQuery, insertValues)
    return data.rows[0]
  }
  catch(e) {
    throw new Error(e)
  }
}

export const update = async (props: Item) => {
  try {
    const updateQuery: string = `UPDATE items
      SET description = $2, priority = $3, date_completed = $4, user_id = $5, section_id = $6, date_archived = $7, is_active = $8
      WHERE id = $1;`
      let updateValues = Object.values(props)
      await query(updateQuery, updateValues)
  }
  catch(e) {
    throw new Error(e)
  }
}
