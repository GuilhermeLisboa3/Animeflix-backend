import { LoginController } from '@/application/controllers/account'
import { makeAuthentication } from '@/main/factories/domain/usecases/account'

export const makeLoginController = (): LoginController => {
  return new LoginController(makeAuthentication())
}
