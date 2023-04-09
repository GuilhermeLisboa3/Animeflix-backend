import { signup, login, updateAccount, updatePassword, getAccountData, getKeepWatchingList } from '@/main/docs/paths/account'
import { listCategory } from '@/main/docs/paths/category'
import { signUpRequest, signUpResponse, loginRequest, loginResponse, updateAccountRequest, updatePasswordRequest, getAccountDataResponse, getKeepWatchingResponse } from '@/main/docs/schema/account'
import { listCategoryResponse } from '@/main/docs/schema/category'
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
  tags: [{ name: 'Account' }, { name: 'Category' }],
  paths: {
    // account
    '/auth/register': signup,
    '/auth/login': login,
    '/users/current': updateAccount,
    '/users/current/password': updatePassword,
    '/users/current/': getAccountData,
    '/users/current/watching': getKeepWatchingList,
    // category
    '/categories?page=&perPage=': listCategory
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
    getAccountDataResponse,
    getKeepWatchingResponse,
    // category
    listCategoryResponse
  },
  components: { securitySchemes, badRequest, serverError, unauthorized, forbidden }
}
