import { Pool, QueryArrayResult, QueryResult, QueryResultRow } from 'pg'

const pool = new Pool({
  user:'dfirmin',
  password:'password',
  host: '127.0.0.1',
  port: 5432,
  database:'level10_test_db'
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const query = (text: string, params?: string[]): Promise<QueryArrayResult | QueryResult | QueryResultRow> => {
  return pool.query(text, params)
}
