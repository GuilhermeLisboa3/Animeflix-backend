import { makeAddWatchTimeController } from '@/main/factories/application/controllers/watch-time'
import { expressRouterAdapter as adapt } from '@/main/adapters'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (route: Router): void => {
  route.post('/episodes/:id/WatchTime', auth, adapt(makeAddWatchTimeController()))
}
