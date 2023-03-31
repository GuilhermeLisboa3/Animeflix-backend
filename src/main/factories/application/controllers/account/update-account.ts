import { UpdateAccountController } from '@/application/controllers/account'
import { makeUpdateAccount } from '@/main/factories/domain/usecases/account'

export const makeUpdateAccountController = (): UpdateAccountController => {
  return new UpdateAccountController(makeUpdateAccount())
}
