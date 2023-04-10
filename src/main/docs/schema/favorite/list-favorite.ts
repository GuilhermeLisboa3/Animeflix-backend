export const listFavoriteResponse = {
  type: 'object',
  properties: {
    accountId: { type: 'number' },
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
