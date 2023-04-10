export const getAnimeByIdResponse = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    synopsis: { type: 'string' },
    thumbnailUrl: { type: 'string' },
    episodes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          synopsis: { type: 'string' },
          videoUrl: { type: 'string' },
          secondsLong: { type: 'number' },
          order: { type: 'number' }
        }
      }
    },
    liked: { type: 'number' },
    favorited: { type: 'boolean' }
  }
}
