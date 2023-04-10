export const getWatchTime = {
  get: {
    security: [{ bearerAuth: [] }],
    tags: ['WatchTime'],
    summary: 'Route to get watch time',
    requestBody: { description: 'No body' },
    parameters: [
      { in: 'query', name: 'id', schema: { type: 'number' }, require: true }
    ],
    responses: {
      200: { content: { 'application/json': { schema: { type: 'object', properties: { seconds: { type: 'number' } } } } } },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
