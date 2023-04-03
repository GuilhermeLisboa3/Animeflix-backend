import { Controller } from '@/application/controllers'
import { HttpResponse, badRequest, ok } from '@/application/helpers'
import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { NotFoundError } from '@/domain/errors'
import { StreamEpisode } from '@/domain/usecases/episode'

type HttpRequest = {
  animeId: string
  order: string
}

export class StreamEpisodeController extends Controller {
  constructor (private readonly streamEpisode: StreamEpisode) { super() }

  async perform ({ animeId, order }: HttpRequest): Promise<HttpResponse> {
    const videoUrl = await this.streamEpisode({ animeId, order })
    if (videoUrl === undefined) return badRequest(new NotFoundError('animeId or order'))
    return ok(videoUrl)
  }

  buildValidators ({ animeId, order }: HttpRequest): Validator[] {
    return [
      ...builder.of(order, 'order').required().build(),
      ...builder.of(animeId, 'animeId').required().build()
    ]
  }
}
