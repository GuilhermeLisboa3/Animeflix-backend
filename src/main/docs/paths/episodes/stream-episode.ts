export const streamEpisode = {
  get: {
    tags: ['Episode'],
    summary: 'Route to stream episode',
    requestBody: { description: 'No body' },
    parameters: [
      { in: 'query', name: 'token', schema: { type: 'string' }, require: true },
      { in: 'query', name: 'animeId', schema: { type: 'number' }, require: true },
      { in: 'query', name: 'order', schema: { type: 'string' }, require: true }
    ],
    responses: {
      200: { content: { 'application/json': { schema: { type: 'string' } } } },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
