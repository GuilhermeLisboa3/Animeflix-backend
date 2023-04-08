export const updateAccountRequest = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    phone: { type: 'string', example: '9xxxx-xxxx' },
    email: { type: 'string' },
    birth: { type: 'string', format: 'date', example: 'YYYY-MM-DD' }
  }
}
