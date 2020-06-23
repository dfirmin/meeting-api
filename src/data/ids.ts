import BaseData from '../helpers/base-data'
import Knex from 'knex'

class IdsData extends BaseData {

  tableName: string = 'update'
  selectableProps:string[] = ['description', 'priority', 'isActive']
  timeout:number = 1000
  
  constructor(knex: Knex){
    super(knex)
  }
}

export default IdsData