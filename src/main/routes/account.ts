import { makeSignUpController, makeLoginController, makeUpdateAccountController, makeUpdatePasswordController } from '@/main/factories/application/controllers/account'
import { expressRouterAdapter as adapt } from '@/main/adapters'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (route: Router): void => {
  route.post('/auth/register', adapt(makeSignUpController()))
  route.post('/auth/login', adapt(makeLoginController()))
  route.put('/users/current', auth, adapt(makeUpdateAccountController()))
  route.put('/users/current/password', auth, adapt(makeUpdatePasswordController()))
}
