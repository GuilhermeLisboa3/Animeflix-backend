import { HttpResponse, noContent } from '@/application/helpers'
import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { UpdateEpisode } from '@/domain/usecases/episode'

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
  constructor (private readonly updateEpisode: UpdateEpisode) {}

  async perform ({ name, animeId, order, synopsis, file, secondsLong, id }: HttpRequest): Promise<HttpResponse> {
    await this.updateEpisode({ name, animeId, order, synopsis, file, secondsLong, id })
    return noContent()
  }

  buildValidators ({ id, file }: HttpRequest): Validator[] {
    return [
      ...builder.of(id, 'id').required().build(),
      ...builder.of(file, 'file').image({ AllowedMimeTypes: ['mp4'], maxSizeInMb: 100 }).build()
    ]
  }
}
