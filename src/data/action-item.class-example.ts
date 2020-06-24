import BaseData from '../helpers/base-data.class-example'
import { QueryBuilder } from 'knex'

class ActionItemData extends BaseData {

  tableName: string = 'item'
  selectableProps: string[] = ['description', 'priority', 'isActive']
  timeout:number = 1000
  
  constructor(knex: QueryBuilder){
    super(knex)
  }
}

export default ActionItemData