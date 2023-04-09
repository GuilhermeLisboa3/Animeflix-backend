export const getAccountData = {
  get: {
    security: [{ bearerAuth: [] }],
    tags: ['Account'],
    summary: 'Route to get user data',
    requestBody: { description: 'No body' },
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/getAccountDataResponse' } } } },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
