import { Authorize, AuthorizeUseCase } from '@/domain/usecases/account'
import { makeTokenAdapter } from '@/main/factories/infra/gateways'
import { makeAccountRespository } from '@/main/factories/infra/database/postgres'

export const makeAuthorize = (): Authorize => {
  return AuthorizeUseCase(makeTokenAdapter(), makeAccountRespository())
}
