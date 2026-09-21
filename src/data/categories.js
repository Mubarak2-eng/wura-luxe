export const categories = [
  {
    id: 'all',
    label: 'All Products',
    description: 'Browse our full collection',
  },
  {
    id: 'edp',
    label: 'Eau de Parfum',
    description: 'Long-lasting luxury sprays',
  },
  {
    id: 'edt',
    label: 'Eau de Toilette',
    description: 'Fresh everyday sprays',
  },
  {
    id: 'oil',
    label: 'Perfume Oils',
    description: 'Alcohol-free attars & oils',
  },
  {
    id: 'mist',
    label: 'Body Mists',
    description: 'Light refreshing sprays',
  },
  {
    id: 'candle',
    label: 'Home Fragrance',
    description: 'Luxury scented candles',
  },
  {
    id: 'gift',
    label: 'Gift Sets',
    description: 'Curated luxury collections',
  },
]

export const getCategoryLabel = (id) => {
  const cat = categories.find((c) => c.id === id)
  return cat ? cat.label : id
}
