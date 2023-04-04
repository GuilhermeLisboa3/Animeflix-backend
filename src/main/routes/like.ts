import { makeAddLikeController } from '@/main/factories/application/controllers/like'
import { expressRouterAdapter as adapt } from '@/main/adapters'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (route: Router): void => {
  route.post('/likes', auth, adapt(makeAddLikeController()))
}
