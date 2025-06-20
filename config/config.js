import pg from 'pg'
import 'dotenv/config'

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env

export const pool = new pg.Pool({
  host: DB_HOST,
  port: parseInt(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  allowExitOnIdle: true
})

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err)
  } else {
    console.log('Conexión a la base de datos exitosa:', res.rows[0])
  }
})

pool.on('error', (err, client) => {
  console.error('Error inesperado en el cliente inactivo', err)
  process.exit(-1)
})
