import { makeAddAnimeController, makeDeleteAnimeController, makeGetAnimeByIdController, makeUpdateAnimeController } from '@/main/factories/application/controllers/anime'
import { expressRouterAdapter as adapt, multerAdapter } from '@/main/adapters'
import { auth, authAdmin } from '@/main/middlewares'

import { Router } from 'express'

export default (route: Router): void => {
  route.post('/anime', authAdmin, multerAdapter, adapt(makeAddAnimeController()))
  route.get('/anime/:id', auth, adapt(makeGetAnimeByIdController()))
  route.delete('/anime/:id', authAdmin, adapt(makeDeleteAnimeController()))
  route.put('/anime/:id', authAdmin, multerAdapter, adapt(makeUpdateAnimeController()))
}
