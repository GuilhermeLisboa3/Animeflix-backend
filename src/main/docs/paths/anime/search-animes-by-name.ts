export const searchAnimesByName = {
  get: {
    security: [{ bearerAuth: [] }],
    tags: ['Anime'],
    summary: 'Route to search for an anime by name',
    requestBody: { description: 'No body' },
    parameters: [
      { in: 'query', name: 'page', schema: { type: 'number' } },
      { in: 'query', name: 'perPage', schema: { type: 'number' } },
      { in: 'query', name: 'name', schema: { type: 'string' }, require: true }
    ],
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/searchAnimesByNameResponse' } } } },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
