import { makeAddCategoryController, makeListCategoryController } from '@/main/factories/application/controllers/category'
import { expressRouterAdapter as adapt } from '@/main/adapters'
import { auth, authAdmin } from '@/main/middlewares'

import { Router } from 'express'

export default (route: Router): void => {
  route.post('/category', authAdmin, adapt(makeAddCategoryController()))
  route.get('/categories', auth, adapt(makeListCategoryController()))
}
