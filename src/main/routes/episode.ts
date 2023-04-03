import { makeAddEpisodeController, makeDeleteEpisodeController, makeStreamEpisodeController, makeUpdateEpisodeController } from '@/main/factories/application/controllers/episode'
import { expressRouterAdapter as adapt, multerAdapter } from '@/main/adapters'
import { auth, authAdmin } from '@/main/middlewares'

import { Router } from 'express'

export default (route: Router): void => {
  route.post('/episode', authAdmin, multerAdapter, adapt(makeAddEpisodeController()))
  route.get('/episode/stream', auth, adapt(makeStreamEpisodeController()))
  route.delete('/episode/:id', authAdmin, adapt(makeDeleteEpisodeController()))
  route.put('/episode/:id', authAdmin, multerAdapter, adapt(makeUpdateEpisodeController()))
}
