import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { StreamEpisode } from '@/domain/usecases/episode'

type HttpRequest = {
  animeId: string
  order: string
}

export class StreamEpisodeController {
  constructor (private readonly streamEpisode: StreamEpisode) {}

  async perform ({ animeId, order }: HttpRequest): Promise<void> {
    await this.streamEpisode({ animeId, order })
  }

  buildValidators ({ animeId, order }: HttpRequest): Validator[] {
    return [
      ...builder.of(order, 'order').required().build(),
      ...builder.of(animeId, 'animeId').required().build()
    ]
  }
}
