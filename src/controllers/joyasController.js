import { getJoyasModel, getFiltrosModel } from '../models/joyasModel.js'
import {
  transformJoyasResponse,
  HATEOASCollection
} from '../helpers/hateoas.js'

const API_BASE_URL = 'http://localhost:3000'

export const getJoyasController = async (req, res) => {
  const { page = 1, limits = 10, order_by = 'id_ASC' } = req.query
  try {
    const { items, totalJoyas, stockTotal } = await getJoyasModel(
      page,
      limits,
      order_by
    )

    const formattedResponse = await transformJoyasResponse(
      items,
      totalJoyas,
      stockTotal
    )

    res.status(200).json(formattedResponse)
  } catch (error) {
    console.error('Error al obtener joyas:', error)
    res.status(500).json({ message: 'Error en el servidor al obtener joyas' })
  }
}

export const getFiltrosController = async (req, res) => {
  const { precio_min, precio_max, categoria, metal } = req.query
  try {
    const { items, totalJoyas, stockTotal } = await getFiltrosModel(
      precio_min,
      precio_max,
      categoria,
      metal
    )

    const formattedResponse = await transformJoyasResponse(
      items,
      totalJoyas,
      stockTotal
    )

    res.status(200).json(formattedResponse)
  } catch (error) {
    console.error('Error al obtener joyas con filtros:', error)
    res
      .status(500)
      .json({ message: 'Error en el servidor al obtener joyas filtradas' })
  }
}
