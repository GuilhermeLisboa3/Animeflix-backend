import { makeAddFavoriteController, makeDeleteFavoriteController, makeListFavoriteController } from '@/main/factories/application/controllers/favorite'
import { expressRouterAdapter as adapt } from '@/main/adapters'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (route: Router): void => {
  route.get('/favorites', auth, adapt(makeListFavoriteController()))
  route.post('/favorites', auth, adapt(makeAddFavoriteController()))
  route.delete('/favorites/:id', auth, adapt(makeDeleteFavoriteController()))
}
