import { contentType, cors, bodyParser } from '@/main/middlewares'

import { Express } from 'express'

export const setupMiddlewares = (app: Express): void => {
  app.use(contentType)
  app.use(cors)
  app.use(bodyParser)
}
