import Item from "../models/item";
import Series from "../models/series";
import Knex from 'knex'


class BaseData { 
  knex: Knex
  tableName: string = ''
  selectableProps:string[] = []
  timeout:number = 1000

  constructor(knex: Knex) { 
    this.knex = knex
  }  

  //function will accept multiple types as props, not just one
  public create = (props: Item | Series) => {
    delete props.id
    return this.knex().insert(props)
      .returning(this.selectableProps)
      .into(this.tableName)
      .timeout(this.timeout)
      .finally(() => this.knex().destroy());
  }

  public findAll = () => this.knex().select(this.selectableProps)
    .from(this.tableName)
    .timeout(this.timeout)

  public find = (filters: {}) => this.knex().select(this.selectableProps)
    .from(this.tableName)
    .where(filters)
    .timeout(this.timeout)

  public findById = (id: number) => this.knex().select(this.selectableProps)
    .from(this.tableName)
    .where({ id })
    .timeout(this.timeout)

  public update = (id: number, props: Item) => {
    delete props.id // not allowed to set `id`
    return this.knex().update(props)
      .from(this.tableName)
      .where({ id })
      .returning(this.selectableProps)
      .timeout(this.timeout)
  }

  public destroy = (id: number) => this.knex().del()
    .from(this.tableName)
    .where({ id })
    .timeout(this.timeout)
}

export default BaseData