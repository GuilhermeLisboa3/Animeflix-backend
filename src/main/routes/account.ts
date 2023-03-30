import { makeSignUpController, makeLoginController } from '@/main/factories/application/controllers/account'
import { expressRouterAdapter as adapt } from '@/main/adapters'

import { Router } from 'express'

export default (route: Router): void => {
  route.post('/auth/register', adapt(makeSignUpController()))
  route.post('/auth/login', adapt(makeLoginController()))
}
