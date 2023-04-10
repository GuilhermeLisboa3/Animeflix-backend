export const getAnimeById = {
  get: {
    security: [{ bearerAuth: [] }],
    tags: ['Anime'],
    summary: 'Route to get anime data',
    requestBody: { description: 'No body' },
    parameters: [{ in: 'path', name: 'id', schema: { type: 'number' } }],
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/getAnimeByIdResponse' } } } },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
