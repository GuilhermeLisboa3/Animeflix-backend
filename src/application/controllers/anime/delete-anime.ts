import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { DeleteAnime } from '@/domain/usecases/anime'

type HttpRequest = { id: string }

export class DeleteAnimeController {
  constructor (private readonly deleteAnime: DeleteAnime) {}

  async perform ({ id }: HttpRequest): Promise<void> {
    await this.deleteAnime({ id })
  }

  buildValidators ({ id }: HttpRequest): Validator[] {
    return [
      ...builder.of(id, 'id').required().build()
    ]
  }
}
