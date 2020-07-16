import Series from '../models/series'
import { query } from '../db/index'

export const create = async (props: Series): Promise<Series[]> => {
  const createQuery = `INSERT INTO series
  (time_allocated, start_date, team_id)
  VALUES($1, $2, $3) RETURNING admin_user_id;`

  delete props.adminUserId
  const queryArray = Object.values(props)
  const item: Series[] = await query(createQuery, queryArray)
    .then((res) => {
      return res.rows[0]
    })
    .catch((e) => {
      throw new Error(e.message)
    })
  return item
}

export const update = async (props: Series): Promise<void> => {
  const updateQuery = `UPDATE series
  SET time_allocated = $2, start_date = $3, team_id = $4
  WHERE admin_user_id = $1;`

  const updateQueryArray = Object.values(props)
  await query(updateQuery, updateQueryArray).catch((e) => {
    throw new Error(e.message)
  })
}
