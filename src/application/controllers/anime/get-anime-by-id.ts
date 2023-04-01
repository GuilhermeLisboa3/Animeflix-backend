import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { GetAnimeById } from '@/domain/usecases/anime'

type HttpRequest = { id: string }

export class GetAnimeByIdController {
  constructor (private readonly getAnimeById: GetAnimeById) {}

  async perform ({ id }: HttpRequest): Promise<void> {
    await this.getAnimeById({ id })
  }

  buildValidators ({ id }: HttpRequest): Validator[] {
    return [
      ...builder.of(id, 'id').required().build()
    ]
  }
}
