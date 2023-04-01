import { Validator, ValidationBuilder as builder } from '@/application/validation'

type HttpRequest = {
  id: string
  name?: string
  categoryId?: number
  file?: { buffer: Buffer, mimeType: string }
  synopsis?: string
  featured?: boolean
}

export class UpdateAnimeController {
  buildValidators ({ id, file }: HttpRequest): Validator[] {
    return [
      ...builder.of(id, 'id').required().build(),
      ...builder.of(file, 'file').image({ AllowedMimeTypes: ['jpg', 'png'], maxSizeInMb: 6 }).build()
    ]
  }
}
