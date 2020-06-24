import { QueryBuilder } from 'knex'
import AnotherExample from '../models/example';
import Item from '../models/item';

interface BaseCrud {
  knex: QueryBuilder,
  name: string,
  tableName: string,
  selectableProps: string[],
  timeout?: number
}
const BaseCrud = ({
  knex= {},
  name = 'name',
  tableName = 'tablename',
  selectableProps = [],
  timeout = 1000
}: BaseCrud) => {
  const create = (props: Item | AnotherExample) => {
    delete props.id
    return knex.insert(props)
      .returning(selectableProps)
      .into(tableName)
      .timeout(timeout)
      .finally(() => knex.destroy());
  }

  const findAll = () => knex.select(selectableProps)
    .from(tableName)
    .timeout(timeout)

  const find = (filters: {}) => knex.select(selectableProps)
    .from(tableName)
    .where(filters)
    .timeout(timeout)

  //returns the first match if >1 are found.
  // const findOne = (filters:{ [key: string]: string; }) => find(filters)
  //   .then(results => {
  //     if (!Array.isArray(results)) return results
  //     return results[0]
  //   })
    

  const findById = (id: number) => knex.select(selectableProps)
    .from(tableName)
    .where({ id })
    .timeout(timeout)

  const update = (id: number, props: Item | AnotherExample) => {
    delete props.id // not allowed to set `id`
    return knex.update(props)
      .from(tableName)
      .where({ id })
      .returning(selectableProps)
      .timeout(timeout)
  }

  const destroy = (id: number) => knex.del()
    .from(tableName)
    .where({ id })
    .timeout(timeout)


  return {
    name,
    tableName,
    selectableProps,
    timeout,
    create,
    findAll,
    find,
    findById,
    update,
    destroy
  }
}

export default BaseCrud