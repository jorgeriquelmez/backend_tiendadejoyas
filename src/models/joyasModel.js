import { pool } from '../../config/config.js'

export const getJoyasModel = async (
  page = 1,
  limits = 10,
  order_by = 'id_ASC'
) => {
  try {
    const offset = (page - 1) * limits
    const [attribute, direction] = order_by.split('_')

    const allowedAttributes = [
      'id',
      'nombre',
      'categoria',
      'metal',
      'precio',
      'stock'
    ]
    const allowedDirections = ['ASC', 'DESC']

    if (
      !allowedAttributes.includes(attribute) ||
      !allowedDirections.includes(direction.toUpperCase())
    ) {
      throw new Error('Parámetros de ordenamiento inválidos.')
    }

    const dataSql = {
      text: `SELECT * FROM inventario ORDER BY "${attribute}" ${direction.toUpperCase()} LIMIT $1 OFFSET $2`,
      values: [limits, offset]
    }
    const dataResult = await pool.query(dataSql)
    const items = dataResult.rows

    const totalCountSql = 'SELECT COUNT(*) AS total FROM inventario'
    const totalCountResult = await pool.query(totalCountSql)
    const totalJoyas = parseInt(totalCountResult.rows[0].total)

    const totalStockSql = 'SELECT SUM(stock) AS total_stock FROM inventario'
    const totalStockResult = await pool.query(totalStockSql)
    const stockTotal = parseInt(totalStockResult.rows[0].total_stock)

    return { items, totalJoyas, stockTotal }
  } catch (error) {
    console.error('Error al obtener joyas en el modelo:', error)
    throw new Error('Error en la query para obtener joyas: ' + error.message)
  }
}

export const getFiltrosModel = async (
  precio_min,
  precio_max,
  categoria,
  metal
) => {
  const filtros = []
  const values = []
  let paramCount = 1

  if (precio_min) {
    filtros.push(`precio >= $${paramCount++}`)
    values.push(precio_min)
  }

  if (precio_max) {
    filtros.push(`precio <= $${paramCount++}`)
    values.push(precio_max)
  }

  if (categoria) {
    filtros.push(`categoria = $${paramCount++}`)
    values.push(categoria)
  }

  if (metal) {
    filtros.push(`metal = $${paramCount++}`)
    values.push(metal)
  }

  let whereClause = ''
  if (filtros.length > 0) {
    whereClause = ' WHERE ' + filtros.join(' AND ')
  }

  try {
    const dataConsulta = `SELECT * FROM inventario${whereClause}`
    const dataResult = await pool.query(dataConsulta, values)
    const items = dataResult.rows

    const totalCountSql = `SELECT COUNT(*) AS total FROM inventario${whereClause}`
    const totalCountResult = await pool.query(totalCountSql, values)
    const totalJoyas = parseInt(totalCountResult.rows[0].total)

    const totalStockSql = `SELECT SUM(stock) AS total_stock FROM inventario${whereClause}`
    const totalStockResult = await pool.query(totalStockSql, values)
    const stockTotal = parseInt(totalStockResult.rows[0].total_stock) || 0

    return { items, totalJoyas, stockTotal }
  } catch (error) {
    console.error('Error al obtener joyas con filtros en el modelo:', error)
    throw new Error('Error en la query para obtener joyas con filtros')
  }
}
