import { Middleware } from '@/application/middleware'

import { RequestHandler } from 'express'

export const expressMiddlewareAdapter = (middleware: Middleware): RequestHandler => async (req, res, next) => {
  await middleware.handle({ ...req.headers, ...req.query })
}
