import { ServerError } from '@/application/errors'
import { RequestHandler } from 'express'
import multer from 'multer'

export const multerAdapter: RequestHandler = (req, res, next) => {
  const upload = multer().single('file')
  upload(req, res, error => {
    if (error) return res.status(500).json({ error: new ServerError(error).message })
  })
}
