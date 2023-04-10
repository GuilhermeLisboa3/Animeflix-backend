export const listAnimeNewestResponse = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      synopsis: { type: 'string' },
      thumbnailUrl: { type: 'string' },
      likes: { type: 'number' },
      categoryId: { type: 'number' },
      featured: { type: 'boolean' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' }
    }
  }
}
