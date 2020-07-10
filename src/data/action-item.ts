import Item from '../models/item'
import { query } from '../db/index'


interface IActionItemData {
  create: (props: Item) => Promise<Item[]>
  update: (props: Item) => void
  getAll: (filter: { userId:string, completed:string, isActive:string }) => Promise<Item[][]>
  getOne: (id: string) => Promise<Item[]>
}

export const ActionItemData = (): IActionItemData => {

  const create = async (props: Item) => {
    const createQuery = `INSERT INTO items 
    (description, priority, date_completed, user_id, meeting_series_id, section_id, date_archived, is_active)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
  
    delete props.id
    let insertValues = Object.values(props)
    const id: Item[] = await query(createQuery, insertValues)
    .then((res) => {
      return res.rows[0]
    })
    .catch((e) => {
      console.log(e)
      return []
    })
    return id 
  }
  
  const update = async (props: Item) => {
    const updateQuery = `UPDATE items
    SET description = $2, priority = $3, date_completed = $4, user_id = $5, meeting_series_id = $6, section_id = $7, date_archived = $8, is_active = $9
    WHERE id = $1;`

    let updateValues = Object.values(props)
    await query(updateQuery, updateValues)
      .catch(e => console.error(e.stack))
  }

  const getAll = async (filter: { userId:string, completed:string, isActive:string }) => {
    let getQuery = `SElECT * FROM items WHERE user_id = $1`
    const getValues = []
    getValues.push(filter.userId)

    if(filter.completed){
      getQuery +=  'AND completed = $2'
      getValues.push(filter.completed)
    }
    if(filter.isActive){
      getQuery +=  'AND is_active = $3'
      getValues.push(filter.isActive)
    }
    
    const data: Item[][] = await query(getQuery, getValues)
      .then((res) => { 
        return res.rows
      })
      .catch((e) => {
        console.log(e)
        return [] as Item[][]
      })
    return data
  }

  const getOne = async (id: string) => {
    const getQuery = `SElECT * FROM items WHERE id = $1`
    
    const item: Item[] = await query(getQuery, [id])
    .then((res) => {
      return res.rows[0]
    })
    return item
  }
  
  return{
    create,
    update,
    getAll,
    getOne,
  }
}