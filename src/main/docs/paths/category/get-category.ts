export const getCategory = {
  get: {
    security: [{ bearerAuth: [] }],
    tags: ['Category'],
    summary: 'Route to get category data',
    requestBody: { description: 'No body' },
    parameters: [{ in: 'path', name: 'id', schema: { type: 'number' } }],
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/getCategoryResponse' } } } },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
