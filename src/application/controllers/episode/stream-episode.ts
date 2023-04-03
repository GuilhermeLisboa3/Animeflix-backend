import { Validator, ValidationBuilder as builder } from '@/application/validation'

type HttpRequest = {
  animeId: string
  order: string
}

export class StreamEpisodeController {
  buildValidators ({ animeId, order }: HttpRequest): Validator[] {
    return [
      ...builder.of(order, 'order').required().build(),
      ...builder.of(animeId, 'animeId').required().build()
    ]
  }
}
