import knex from 'knex'
import { development } from '../../knexfile'
//const env = process.env.ENVIRONMENT || 'development'
export default knex(development)
