export const addLike = {
  post: {
    security: [{ bearerAuth: [] }],
    tags: ['Like'],
    summary: 'Route to add like anime',
    requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { animeId: { type: 'number' } } } } } },
    responses: {
      204: { description: 'No body' },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
