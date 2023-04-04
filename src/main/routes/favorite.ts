import { makeAddFavoriteController } from '@/main/factories/application/controllers/favorite'
import { expressRouterAdapter as adapt } from '@/main/adapters'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (route: Router): void => {
  route.post('/favorites', auth, adapt(makeAddFavoriteController()))
}
