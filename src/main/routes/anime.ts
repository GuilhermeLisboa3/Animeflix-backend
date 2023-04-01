import { makeAddAnimeController, makeDeleteAnimeController } from '@/main/factories/application/controllers/anime'
import { expressRouterAdapter as adapt, multerAdapter } from '@/main/adapters'
import { authAdmin } from '@/main/middlewares'

import { Router } from 'express'

export default (route: Router): void => {
  route.post('/anime', authAdmin, multerAdapter, adapt(makeAddAnimeController()))
  route.delete('/anime/:id', authAdmin, adapt(makeDeleteAnimeController()))
}
