import { HttpResponse, noContent } from '@/application/helpers'
import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { AddEpisode } from '@/domain/usecases/episode'

type HttpRequest = {
  name: string
  animeId: number
  order: number
  file?: { buffer: Buffer, mimeType: string }
  synopsis: string
  secondsLong?: number
}

export class AddEpisodeController {
  constructor (private readonly addEpisode: AddEpisode) {}

  async perform ({ name, animeId, order, synopsis, file, secondsLong }: HttpRequest): Promise<HttpResponse> {
    await this.addEpisode({ name, animeId, order, synopsis, file, secondsLong })
    return noContent()
  }

  buildValidators ({ animeId, name, order, synopsis, file }: HttpRequest): Validator[] {
    return [
      ...builder.of(name, 'name').required().build(),
      ...builder.of(animeId, 'animeId').required().build(),
      ...builder.of(synopsis, 'synopsis').required().build(),
      ...builder.of(order, 'order').required().build(),
      ...builder.of(file, 'file').image({ AllowedMimeTypes: ['mp4'], maxSizeInMb: 100 }).build()
    ]
  }
}
