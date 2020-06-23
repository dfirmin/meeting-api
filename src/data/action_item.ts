  
import BaseData from '../helpers/base-data'
import Knex from 'knex'

class ActionItemData extends BaseData {

  tableName: string = 'item'
  selectableProps:string[] = ['description', 'priority', 'isActive']
  timeout:number = 1000
  
  constructor(knex: Knex){
    super(knex)
  }
}

export default ActionItemData