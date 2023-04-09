export const listCategoryResponse = {
  type: 'object',
  properties: {
    categories: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          position: { type: 'number' }
        }
      }
    },
    page: { type: 'number' },
    perPage: { type: 'number' },
    count: { type: 'number' }
  }
}
