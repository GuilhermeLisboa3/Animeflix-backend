export const deleteCategory = {
  delete: {
    security: [{ bearerAuth: [] }],
    tags: ['Category'],
    summary: 'Route to delete category',
    requestBody: { description: 'No body' },
    parameters: [{ in: 'path', name: 'id', schema: { type: 'number' } }],
    responses: {
      204: { description: 'No body' },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      403: { $ref: '#/components/forbidden' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
