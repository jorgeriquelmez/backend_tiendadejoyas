import express from 'express'
import 'dotenv/config'
import joyasRoutes from './src/routes/joyasRoutes.js'
import { pool } from './config/config.js'
const app = express()
const PORT = process.env.PORT ?? 5000
// Verifica la conexión a la base de datos

app.use(express.json())
app.use(joyasRoutes)
app.listen(PORT, () => {
  console.log(`Servidor esta funcionando en el puerto http://localhost:${PORT}`)
})
