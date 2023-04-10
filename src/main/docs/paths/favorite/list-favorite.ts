export const listFavorite = {
  get: {
    security: [{ bearerAuth: [] }],
    tags: ['Favorite'],
    summary: 'Route to get favorite animes ',
    requestBody: { description: 'No body' },
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/listFavoriteResponse' } } } },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
