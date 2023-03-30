import { Middleware } from '@/application/middleware'

import { RequestHandler } from 'express'

export const expressMiddlewareAdapter = (middleware: Middleware): RequestHandler => async (req, res, next) => {
  const { statusCode, data } = await middleware.handle({ ...req.headers, ...req.query })
  res.status(statusCode).json({ error: data.message })
}
