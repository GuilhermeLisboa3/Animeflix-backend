import { signup, login, updateAccount, updatePassword, getAccountData } from '@/main/docs/paths/account'
import { signUpRequest, signUpResponse, loginRequest, loginResponse, updateAccountRequest, updatePasswordRequest, getAccountDataResponse } from '@/main/docs/schema/account'
import { badRequest, serverError, unauthorized, forbidden, securitySchemes } from '@/main/docs/components'
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
    '/auth/register': signup,
    '/auth/login': login,
    '/users/current': updateAccount,
    '/users/current/password': updatePassword,
    '/users/current/': getAccountData
  },
  schemas: {
    // error
    error,
    // account
    signUpRequest,
    signUpResponse,
    loginRequest,
    loginResponse,
    updateAccountRequest,
    updatePasswordRequest,
    getAccountDataResponse
  },
  components: { securitySchemes, badRequest, serverError, unauthorized, forbidden }
}
