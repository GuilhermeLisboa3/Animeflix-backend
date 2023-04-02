import { makeAddAnimeController, makeDeleteAnimeController, makeGetAnimeByIdController, makeListAnimeByFeaturedController, makeSearchAnimesByNameController, makeUpdateAnimeController } from '@/main/factories/application/controllers/anime'
import { expressRouterAdapter as adapt, multerAdapter } from '@/main/adapters'
import { auth, authAdmin } from '@/main/middlewares'

import { Router } from 'express'

export default (route: Router): void => {
  route.post('/anime', authAdmin, multerAdapter, adapt(makeAddAnimeController()))
  route.get('/animes/search', auth, adapt(makeSearchAnimesByNameController()))
  route.get('/animes/featured', auth, adapt(makeListAnimeByFeaturedController()))
  route.get('/animes/:id', auth, adapt(makeGetAnimeByIdController()))
  route.delete('/anime/:id', authAdmin, adapt(makeDeleteAnimeController()))
  route.put('/anime/:id', authAdmin, multerAdapter, adapt(makeUpdateAnimeController()))
}
