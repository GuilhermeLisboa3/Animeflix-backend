export const getTopTenAnimesByLikesResponse = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      synopsis: { type: 'string' },
      thumbnailUrl: { type: 'string' },
      likes: { type: 'number' }
    }
  }
}
