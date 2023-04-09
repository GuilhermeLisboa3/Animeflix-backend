export const getAccountDataResponse = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    phone: { type: 'string', example: '9xxxx-xxxx' },
    email: { type: 'string' },
    role: { type: 'string' },
    birth: { type: 'string', format: 'date', example: 'YYYY-MM-DD' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
    password: { type: 'string' }
  }
}
