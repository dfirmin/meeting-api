import Series from '../models/series'
import { query } from '../db/index'

export const create = async (props: Series): Promise<string> => {
  try {
    const createQuery = `INSERT INTO meeting_series (user_id, time_allocated, start_date, team_id) VALUES($1, $2, $3, $4) RETURNING id;`
    delete props.id
    const queryArray = Object.values(props)
    const data = await query(createQuery, queryArray)
    return data.rows[0].id
  } catch (e) {
    throw new Error(e.message)
  }
}

export const update = async (props: Series): Promise<void> => {
  try {
    const updateQuery = `UPDATE meeting_series SET admin_user_id = $2 time_allocated = $3, start_date = $4, team_id = $5 WHERE id = $1;`
    const updateQueryArray = Object.values(props)
    await query(updateQuery, updateQueryArray)
  } catch (e) {
    throw new Error(e.message)
  }
}
