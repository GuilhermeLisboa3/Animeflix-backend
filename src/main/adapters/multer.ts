import { RequestHandler } from 'express'
import multer from 'multer'

export const multerAdapter: RequestHandler = (req, res, next) => {
  const upload = multer().single('file')
  upload(req, res, () => {})
}
