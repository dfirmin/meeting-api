import { Pool, QueryArrayResult } from 'pg'

const pool = new Pool()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const query = (text: string, params?: string[]): Promise<QueryArrayResult<any[]>> => {
  return pool.query(text, params)
}
