import { UpdatePasswordController } from '@/application/controllers/account'
import { makeUpdateAccount } from '@/main/factories/domain/usecases/account'

export const makeUpdatePasswordController = (): UpdatePasswordController => {
  return new UpdatePasswordController(makeUpdateAccount())
}
