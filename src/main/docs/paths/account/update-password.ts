export const updatePassword = {
  put: {
    security: [{ bearerAuth: [] }],
    tags: ['Account'],
    summary: 'Route to update password account',
    requestBody: { content: { 'application/json': { schema: { $ref: '#/schemas/updatePasswordRequest' } } } },
    responses: {
      204: { description: 'No body' },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
