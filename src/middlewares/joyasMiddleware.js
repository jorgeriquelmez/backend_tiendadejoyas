// src/middlewares/validateJoyasQueryParams.js

const validateJoyasQueryParams = (req, res, next) => {
  const { page, limits, order_by, precio_min, precio_max, categoria, metal } =
    req.query

  // Validar 'page' y 'limits'
  if (page && (isNaN(parseInt(page)) || parseInt(page) <= 0)) {
    console.warn(
      `Advertencia de middleware: 'page' con valor inválido: ${page}`
    )
    return res
      .status(400)
      .json({
        message: "El parámetro 'page' debe ser un número entero positivo."
      })
  }
  if (limits && (isNaN(parseInt(limits)) || parseInt(limits) <= 0)) {
    console.warn(
      `Advertencia de middleware: 'limits' con valor inválido: ${limits}`
    )
    return res
      .status(400)
      .json({
        message: "El parámetro 'limits' debe ser un número entero positivo."
      })
  }

  // Validar 'order_by'
  const allowedAttributes = [
    'id',
    'nombre',
    'categoria',
    'metal',
    'precio',
    'stock'
  ]
  const allowedDirections = ['ASC', 'DESC']
  if (order_by) {
    const [attribute, direction] = order_by.split('_')
    if (
      !allowedAttributes.includes(attribute) ||
      !allowedDirections.includes(direction.toUpperCase())
    ) {
      console.warn(
        `Advertencia de middleware: 'order_by' con valor inválido: ${order_by}`
      )
      return res.status(400).json({
        message: `El parámetro 'order_by' es inválido. Formato esperado: 'campo_DIRECCION'. Campos permitidos: ${allowedAttributes.join(
          ', '
        )}. Direcciones: ASC, DESC.`
      })
    }
  }

  // Validar 'precio_min' y 'precio_max'
  if (
    precio_min &&
    (isNaN(parseFloat(precio_min)) || parseFloat(precio_min) < 0)
  ) {
    console.warn(
      `Advertencia de middleware: 'precio_min' con valor inválido: ${precio_min}`
    )
    return res
      .status(400)
      .json({
        message: "El parámetro 'precio_min' debe ser un número no negativo."
      })
  }
  if (
    precio_max &&
    (isNaN(parseFloat(precio_max)) || parseFloat(precio_max) < 0)
  ) {
    console.warn(
      `Advertencia de middleware: 'precio_max' con valor inválido: ${precio_max}`
    )
    return res
      .status(400)
      .json({
        message: "El parámetro 'precio_max' debe ser un número no negativo."
      })
  }
  if (
    precio_min &&
    precio_max &&
    parseFloat(precio_min) > parseFloat(precio_max)
  ) {
    console.warn(
      "Advertencia de middleware: 'precio_min' es mayor que 'precio_max'."
    )
    return res
      .status(400)
      .json({
        message:
          "El parámetro 'precio_min' no puede ser mayor que 'precio_max'."
      })
  }

  // Validar 'categoria' y 'metal' (si existen)
  // Ajusta estos valores a tus categorías y metales reales en la DB
  const validCategories = ['anillo', 'collar', 'aros', 'pulsera']
  const validMetals = ['oro', 'plata', 'bronce']

  if (categoria && !validCategories.includes(categoria.toLowerCase())) {
    console.warn(
      `Advertencia de middleware: Categoría '${categoria}' no válida.`
    )
    return res.status(400).json({
      message: `El valor de categoría '${categoria}' no es válido. Las categorías permitidas son: ${validCategories.join(
        ', '
      )}.`,
      totalJoyas: 0,
      stockTotal: 0,
      results: []
    })
  }

  if (metal && !validMetals.includes(metal.toLowerCase())) {
    console.warn(`Advertencia de middleware: Metal '${metal}' no válido.`)
    return res.status(400).json({
      message: `El valor de metal '${metal}' no es válido. Los metales permitidos son: ${validMetals.join(
        ', '
      )}.`,
      totalJoyas: 0,
      stockTotal: 0,
      results: []
    })
  }

  next() // Si todas las validaciones pasan, continúa al siguiente middleware o controlador
}

export default validateJoyasQueryParams
