export const addEpisode = {
  post: {
    security: [{ bearerAuth: [] }],
    tags: ['Episode'],
    summary: 'Route to add episode',
    requestBody: { content: { 'multipart/form-data': { schema: { $ref: '#/schemas/addEpisodeResponse' } } } },
    responses: {
      204: { description: 'No body' },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
