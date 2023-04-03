import { Validator, ValidationBuilder as builder } from '@/application/validation'

type HttpRequest = {
  id: string
  name?: string
  animeId?: number
  order?: number
  file?: { buffer: Buffer, mimeType: string }
  synopsis?: string
  secondsLong?: number
}

export class UpdateEpisodeController {
  buildValidators ({ id, file }: HttpRequest): Validator[] {
    return [
      ...builder.of(id, 'id').required().build(),
      ...builder.of(file, 'file').image({ AllowedMimeTypes: ['mp4'], maxSizeInMb: 100 }).build()
    ]
  }
}
