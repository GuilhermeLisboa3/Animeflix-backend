import { Controller } from '@/application/controllers'

import { RequestHandler } from 'express'

export const expressRouterAdapter = (controller: Controller): RequestHandler => async (req, res) => {
  await controller.handle({ ...req.body, ...req.params, ...req.query })
}
