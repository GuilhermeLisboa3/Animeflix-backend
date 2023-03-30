import { addAccountUseCase, AddAccount } from '@/domain/usecases/account'
import { makeHashAdapter } from '@/main/factories/infra/gateways'
import { makeAccountRespository } from '@/main/factories/infra/database/postgres'

export const makeAddAccount = (): AddAccount => {
  return addAccountUseCase(makeAccountRespository(), makeHashAdapter())
}
