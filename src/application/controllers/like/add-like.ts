import { Validator, ValidationBuilder as build } from '@/application/validation'
import { AddLike } from '@/domain/usecases/like'

type HttpRequest = { accountId: string, animeId: number }

export class AddLikeController {
  constructor (private readonly addLike: AddLike) {}

  async perform ({ accountId, animeId }: HttpRequest): Promise<void> {
    await this.addLike({ accountId, animeId })
  }

  buildValidators ({ animeId, accountId }: HttpRequest): Validator[] {
    return [
      ...build.of(accountId, 'accountId').required().build(),
      ...build.of(animeId, 'animeId').required().build()
    ]
  }
}
