import { UpdateAccountUseCase, UpdateAccount } from '@/domain/usecases/account'
import { makeHashAdapter } from '@/main/factories/infra/gateways'
import { makeAccountRespository } from '@/main/factories/infra/database/postgres'

export const makeUpdateAccount = (): UpdateAccount => {
  return UpdateAccountUseCase(makeAccountRespository(), makeHashAdapter())
}
