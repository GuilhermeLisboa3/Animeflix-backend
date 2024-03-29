export const signup = {
  post: {
    tags: ['Account'],
    summary: 'Route to create a new account',
    requestBody: { content: { 'application/json': { schema: { $ref: '#/schemas/signUpRequest' } } } },
    responses: {
      200: { content: { 'application/json': { schema: { $ref: '#/schemas/signUpResponse' } } } },
      400: { $ref: '#/components/badRequest' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
