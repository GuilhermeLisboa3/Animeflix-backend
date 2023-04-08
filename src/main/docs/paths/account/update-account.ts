export const updateAccount = {
  put: {
    security: [{ bearerAuth: [] }],
    tags: ['Account'],
    summary: 'Route to update account',
    requestBody: { content: { 'application/json': { schema: { $ref: '#/schemas/updateAccountRequest' } } } },
    responses: {
      204: { description: 'No body' },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
