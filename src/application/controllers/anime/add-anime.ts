import { Validator, ValidationBuilder as builder } from '@/application/validation'

type HttpRequest = {
  name: string
  categoryId: number
  file?: { buffer: Buffer, mimeType: string }
  synopsis: string
  featured?: boolean
}

export class AddAnimeController {
  buildValidators ({ name, categoryId, synopsis, featured, file }: HttpRequest): Validator[] {
    return [
      ...builder.of(name, 'name').required().build(),
      ...builder.of(categoryId, 'categoryId').required().build(),
      ...builder.of(synopsis, 'synopsis').required().build(),
      ...builder.of(file, 'file').image({ AllowedMimeTypes: ['jpg', 'png'], maxSizeInMb: 6 }).build()
    ]
  }
}
