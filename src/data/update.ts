import BaseCrud from '../helpers/base-data'
import { QueryBuilder } from 'knex'

const name: string = 'Update'
const tableName: string = 'item'
const selectableProps: string[] = ['description', 'priority', 'isActive']

export const updateData = (knex: QueryBuilder) => {
  const details = BaseCrud({
    knex,
    name,
    tableName,
    selectableProps
  })
  //if needed, overwrite default behavor 
  //example: overwrite create function to add a before save function
  //const create = props => beforeCreate(props).then(user => model_crud.create(user))
  return{
    ...details
  }
}