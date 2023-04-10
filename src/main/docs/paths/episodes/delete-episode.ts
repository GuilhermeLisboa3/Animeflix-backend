export const deleteEpisode = {
  delete: {
    security: [{ bearerAuth: [] }],
    tags: ['Episode'],
    summary: 'Route to delete episode',
    parameters: [{ in: 'path', name: 'id', schema: { type: 'number' } }],
    requestBody: { description: 'No body' },
    responses: {
      204: { description: 'No body' },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
