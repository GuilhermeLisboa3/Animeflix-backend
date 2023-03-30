import { AuthenticationUseCase, Authentication } from '@/domain/usecases/account'
import { makeHashAdapter, makeTokenAdapter } from '@/main/factories/infra/gateways'
import { makeAccountRespository } from '@/main/factories/infra/database/postgres'

export const makeAuthentication = (): Authentication => {
  return AuthenticationUseCase(makeAccountRespository(), makeHashAdapter(), makeTokenAdapter())
}
