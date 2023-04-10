export const updateAnime = {
  put: {
    security: [{ bearerAuth: [] }],
    tags: ['Anime'],
    summary: 'Route to update anime',
    parameters: [{ in: 'path', name: 'id', schema: { type: 'number' } }],
    requestBody: { content: { 'multipart/form-data': { schema: { $ref: '#/schemas/addAnimeResponse' } } } },
    responses: {
      204: { description: 'No body' },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
