export const signUpRequest = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    phone: { type: 'string', example: '9xxxx-xxxx' },
    email: { type: 'string' },
    birth: { type: 'string', format: 'date', example: 'YYYY-MM-DD' },
    password: { type: 'string' }
  },
  required: ['firstName', 'lastName', 'phone', 'email', 'birth', 'password']
}

export const signUpResponse = {
  type: 'object',
  properties: { ok: { type: 'boolean' } }
}
