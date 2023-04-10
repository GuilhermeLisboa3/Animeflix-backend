export const getCategoryResponse = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    position: { type: 'number' },
    animes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          synopsis: { type: 'string' },
          thumbnailUrl: { type: 'string' }
        }
      }
    }
  }
}
