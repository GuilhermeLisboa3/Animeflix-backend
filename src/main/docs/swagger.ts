import { signup } from '@/main/docs/paths/account'
import { signUpRequest, signUpResponse } from '@/main/docs/schema/account'
import { badRequest, serverError } from '@/main/docs/components'
import { error } from '@/main/docs/schema/error'

export const swagger = {
  openapi: '3.0.0',
  info: {
    title: 'Animeflix',
    description: 'API created for the Animeflix application',
    version: '1.0.0',
    contact: {
      name: 'Guilherme Gonçalves Lisboa',
      url: 'https://www.linkedin.com/in/guilhermegon%C3%A7alveslisboa/'
    }
  },
  servers: [{ url: '/' }],
  tags: [{ name: 'Account' }],
  paths: {
    '/auth/register': signup
  },
  schemas: {
    // error
    error,
    // account
    signUpRequest,
    signUpResponse
  },
  components: { badRequest, serverError }
}
