export const addCategoryResponse = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    position: { type: 'number' }
  },
  required: ['name', 'position']
}
