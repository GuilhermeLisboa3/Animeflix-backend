import { makeAddCategoryController, makeListCategoryController, makeDeleteCategoryController, makeGetCategoryController } from '@/main/factories/application/controllers/category'
import { expressRouterAdapter as adapt } from '@/main/adapters'
import { auth, authAdmin } from '@/main/middlewares'

import { Router } from 'express'

export default (route: Router): void => {
  route.post('/category', authAdmin, adapt(makeAddCategoryController()))
  route.get('/categories', auth, adapt(makeListCategoryController()))
  route.delete('/category/:id', authAdmin, adapt(makeDeleteCategoryController()))
  route.get('/categories/:id', auth, adapt(makeGetCategoryController()))
}
