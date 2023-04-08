export const loginRequest = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['email', 'password']
}

export const loginResponse = {
  type: 'object',
  properties: { accessToken: { type: 'string' } }
}
