import { Controller } from '@/application/controllers'

import { RequestHandler } from 'express'

export const expressRouterAdapter = (controller: Controller): RequestHandler => async (req, res) => {
  const { data, statusCode } = await controller.handle({ ...req.body, ...req.params, ...req.query, ...req.locals })
  const json = [200, 204].includes(statusCode) ? data : { error: data.message }
  res.status(statusCode).json(json)
}
