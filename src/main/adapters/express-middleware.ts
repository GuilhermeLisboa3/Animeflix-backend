import { Middleware } from '@/application/middleware'

import { RequestHandler } from 'express'

export const expressMiddlewareAdapter = (middleware: Middleware): RequestHandler => async (req, res, next) => {
  const { statusCode, data } = await middleware.handle({ ...req.headers, ...req.query })
  if (statusCode === 200) {
    const validEntries = Object.entries(data).filter(([, value]) => value)
    req.locals = { ...req.locals, ...Object.fromEntries(validEntries) }
    next()
  } else {
    res.status(statusCode).json({ error: data.message })
  }
}
