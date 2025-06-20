const transformJoyasResponse = (data, totalJoyas, stockTotal) => {
  if (!Array.isArray(data)) {
    return data
  }

  const results = data.map((item) => {
    return {
      name: item.nombre,
      href: `/joyas/joya/${item.id}`
    }
  })

  return {
    totalJoyas,
    stockTotal,
    results
  }
}

const HATEOASCollection = (entity, data, API_BASE_URL) => {
  if (!Array.isArray(data)) {
    return data
  }

  const itemsWithLinks = data.map((item) => {
    return {
      ...item,
      _links: {
        self: { href: `${API_BASE_URL}/${entity}/${item.id}` }
      }
    }
  })

  const collectionLinks = {
    self: { href: `${API_BASE_URL}/${entity}` }
  }

  return {
    _links: collectionLinks,
    count: itemsWithLinks.length,
    items: itemsWithLinks
  }
}

export { transformJoyasResponse, HATEOASCollection }
