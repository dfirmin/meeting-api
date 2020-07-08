import Item from '../models/item'
import { Pool, QueryResult, Query} from 'pg'


interface ActionItemData {
  create: (props: Item) => Promise<string>
  update: (props: Item) => void
  getAll: () => Promise<QueryResult>
  getOne: (id: string) => {}
}

export const ActionItemData = (pool: Pool): ActionItemData => {

  const create = async (props: Item): Promise<string> => {
    const createQuery = `INSERT INTO items 
    (description, priority, dateCompleted, userId, meetingSeriesId, sectionId, dateArchived, isActive)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
  
    delete props.id
    let insertValues = Object.values(props)
    try {
      const id: Promise<string> = await pool.query(createQuery, insertValues)
      .then((res) => {
        return res.rows[0].id
      })
      return id
    }
    catch(err) {
      console.log(err.stack)
      return err.stack
    }
    
  }
  
  const update = async (props: Item) => {
    const updateQuery = `UPDATE items
    SET description = $2, priority = $3, dateCompleted = $4, userId = $5, meetingSeriesId = $6, sectionId = $7, dateArchived = $8, isActive = $9
    WHERE id = $1;`

    let updateValues = Object.values(props)
    pool.query(updateQuery, updateValues)
      .catch(e => console.error(e.stack))
  }

  const getAll = async () => {
    const getQuery = `SElECT * FROM items`
    try {
      const data: QueryResult = await pool.query(getQuery)
      return data
    } catch (err) {
      console.log(err.stack)
      return err.stack
    }
  }

  const getOne = async (id: string) => {
    const getQuery = `SElECT * FROM items WHERE id = $1`
    
    try {
      const user = await pool.query(getQuery, [id])
      .then((res) => {
        return res.rows[0]
      })
      return user
    } catch (err) {
      console.log(err.stack)
    }
  }
  
  return{
    create,
    update,
    getAll,
    getOne,
  }
}