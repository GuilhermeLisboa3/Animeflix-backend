export const getKeepWatchingResponse = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      videoUrl: { type: 'string' },
      secondsLong: { type: 'number' },
      order: { type: 'number' },
      animeId: { type: 'number' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
      anime: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          synopsis: { type: 'string' },
          thumbnailUrl: { type: 'string' },
          featured: { type: 'boolean' }
        }
      },
      watchTime: {
        type: 'object',
        properties: {
          seconds: { type: 'number' },
          userId: { type: 'number' },
          episodeId: { type: 'number' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          EpisodeId: { type: 'number' },
          UserId: { type: 'number' }
        }
      }
    }
  }
}
