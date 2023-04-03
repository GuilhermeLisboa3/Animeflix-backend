import { makeAddEpisodeController } from '@/main/factories/application/controllers/episode'
import { expressRouterAdapter as adapt, multerAdapter } from '@/main/adapters'
import { authAdmin } from '@/main/middlewares'

import { Router } from 'express'

export default (route: Router): void => {
  route.post('/episode', authAdmin, multerAdapter, adapt(makeAddEpisodeController()))
}
