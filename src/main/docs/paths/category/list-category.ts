export const listCategory = {
  get: {
    security: [{ bearerAuth: [] }],
    tags: ['Category'],
    summary: 'Route to list category data',
    requestBody: { description: 'No body' },
    parameters: [{ in: 'query', name: 'page', schema: { type: 'number' } }, { in: 'query', name: 'perPage', schema: { type: 'number' } }],
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/listCategoryResponse' } } } },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
