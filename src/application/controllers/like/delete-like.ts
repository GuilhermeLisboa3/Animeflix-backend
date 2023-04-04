import { Validator, ValidationBuilder as build } from '@/application/validation'
import { DeleteLike } from '@/domain/usecases/like'

type HttpRequest = { accountId: string, animeId: string }

export class DeleteLikeController {
  constructor (private readonly deleteLike: DeleteLike) {}

  async perform ({ accountId, animeId }: HttpRequest): Promise<void> {
    await this.deleteLike({ accountId, animeId })
  }

  buildValidators ({ animeId, accountId }: HttpRequest): Validator[] {
    return [
      ...build.of(accountId, 'accountId').required().build(),
      ...build.of(animeId, 'animeId').required().build()
    ]
  }
}
