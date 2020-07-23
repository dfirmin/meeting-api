<<<<<<< HEAD
import { Pool, QueryArrayResult, QueryResult, QueryResultRow } from 'pg'
=======
import { Pool, QueryArrayResult } from 'pg'
>>>>>>> 9cfb647163469b5da91c1caf65451328da922896

const pool = new Pool()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
<<<<<<< HEAD
export const query = (text: string, params?: string[]): Promise<QueryArrayResult | QueryResult | QueryResultRow> => {
=======
export const query = (text: string, params?: string[]): Promise<QueryArrayResult<any[]>> => {
>>>>>>> 9cfb647163469b5da91c1caf65451328da922896
  return pool.query(text, params)
}
