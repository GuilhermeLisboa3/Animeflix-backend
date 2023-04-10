export const listAnimeNewest = {
  get: {
    tags: ['Anime'],
    summary: 'Route to get a list of the most recent animes',
    requestBody: { description: 'No body' },
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/listAnimeNewestResponse' } } } },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
