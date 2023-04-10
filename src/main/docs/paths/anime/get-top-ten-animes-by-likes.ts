export const getTopTenAnimesByLikes = {
  get: {
    security: [{ bearerAuth: [] }],
    tags: ['Anime'],
    summary: 'Route to get the ten most liked animes',
    requestBody: { description: 'No body' },
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/getTopTenAnimesByLikesResponse' } } } },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
