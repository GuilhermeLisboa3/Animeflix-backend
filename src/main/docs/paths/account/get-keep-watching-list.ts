export const getKeepWatchingList = {
  get: {
    security: [{ bearerAuth: [] }],
    tags: ['Account'],
    summary: 'Route to see keep watching ',
    requestBody: { description: 'No body' },
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/getKeepWatchingResponse' } } } },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
