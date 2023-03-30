import { SignUpController } from '@/application/controllers/account'
import { makeAddAccount } from '@/main/factories/domain/usecases/account'

export const makeSignUpController = (): SignUpController => {
  return new SignUpController(makeAddAccount())
}
