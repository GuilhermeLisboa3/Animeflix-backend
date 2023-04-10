export const searchAnimesByNameResponse = {
  type: 'object',
  properties: {
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
    },
    page: { type: 'number' },
    perPage: { type: 'number' },
    count: { type: 'number' }
  }
}
