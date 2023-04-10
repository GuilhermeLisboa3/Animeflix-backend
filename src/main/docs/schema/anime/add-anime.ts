export const addAnimeResponse = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    synopsis: { type: 'string' },
    file: { type: 'string', format: 'binary' },
    featured: { type: 'boolean' },
    categoryId: { type: 'number' }
  }
}
