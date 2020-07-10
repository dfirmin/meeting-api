import Item from '../models/item'
import { query } from '../db/index'

export const create = async (props: Item): Promise<Item[]>=> {
  const createQuery = `INSERT INTO items 
  (description, priority, date_completed, user_id, meeting_series_id, section_id, date_archived, is_active)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;

  delete props.id
  let insertValues = Object.values(props)
  const item: Item[] = await query(createQuery, insertValues)
    .then((res) => {
      return res.rows[0]
    })
    .catch(((e) => {
      console.error(e.stack)
      return [] as Item[]
    }))
  return item
}

export const update = async (props: Item) => {
  const updateQuery = `UPDATE items
  SET description = $2, priority = $3, date_completed = $4, user_id = $5, meeting_series_id = $6, section_id = $7, date_archived = $8, is_active = $9
  WHERE id = $1;`

  let updateValues = Object.values(props)
  await query(updateQuery, updateValues)
    .catch((e) => {
      console.log(e)
    })
}
