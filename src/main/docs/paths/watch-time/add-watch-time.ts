export const addWatchTime = {
  post: {
    security: [{ bearerAuth: [] }],
    tags: ['WatchTime'],
    summary: 'Route to add watch time',
    requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { seconds: { type: 'number' } } } } } },
    parameters: [
      { in: 'query', name: 'id', schema: { type: 'number' }, require: true }
    ],
    responses: {
      204: { description: 'No body' },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
