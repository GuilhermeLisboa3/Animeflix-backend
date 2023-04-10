import { signup, login, updateAccount, updatePassword, getAccountData, getKeepWatchingList } from '@/main/docs/paths/account'
import { signUpRequest, signUpResponse, loginRequest, loginResponse, updateAccountRequest, updatePasswordRequest, getAccountDataResponse, getKeepWatchingResponse } from '@/main/docs/schema/account'
import { listCategory, getCategory, addCategory, deleteCategory } from '@/main/docs/paths/category'
import { listCategoryResponse, getCategoryResponse, addCategoryResponse } from '@/main/docs/schema/category'
import { listAnimeByFeatured, getTopTenAnimesByLikes, listAnimeNewest, getAnimeById, searchAnimesByName, addAnime, updateAnime } from '@/main/docs/paths/anime'
import { listAnimeByFeaturedResponse, getTopTenAnimesByLikesResponse, listAnimeNewestResponse, getAnimeByIdResponse, searchAnimesByNameResponse, addAnimeResponse } from '@/main/docs/schema/anime'
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
  tags: [{ name: 'Account' }, { name: 'Category' }, { name: 'Anime' }],
  paths: {
    // account
    '/auth/register': signup,
    '/auth/login': login,
    '/users/current': updateAccount,
    '/users/current/password': updatePassword,
    '/users/current/': getAccountData,
    '/users/current/watching': getKeepWatchingList,
    // category
    '/categories?page=&perPage=': listCategory,
    '/categories/{id}': getCategory,
    '/category': addCategory,
    '/category/{id}': deleteCategory,
    // anime
    '/animes/featured': listAnimeByFeatured,
    '/animes/popular': getTopTenAnimesByLikes,
    '/animes/newest': listAnimeNewest,
    '/animes/{id}': getAnimeById,
    '/animes/search?name=&page=&perPage=': searchAnimesByName,
    '/anime': addAnime,
    '/anime/{id}': updateAnime
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
    listCategoryResponse,
    getCategoryResponse,
    addCategoryResponse,
    // anime
    listAnimeByFeaturedResponse,
    getTopTenAnimesByLikesResponse,
    listAnimeNewestResponse,
    getAnimeByIdResponse,
    searchAnimesByNameResponse,
    addAnimeResponse
  },
  components: { securitySchemes, badRequest, serverError, unauthorized, forbidden }
}
