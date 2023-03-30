import { Middleware, AuthenticationMiddleware } from '@/application/middleware'
import { makeAuthorize } from '@/main/factories/domain/usecases/account'

export const makeAuthenticationMiddleware = (role?: string): Middleware => {
  return new AuthenticationMiddleware(makeAuthorize(), role)
}
