import { Validator, ValidationBuilder as build } from '@/application/validation'
import { AddFavorite } from '@/domain/usecases/favorite'

type HttpRequest = { accountId: string, animeId: number }

export class AddFavoriteController {
  constructor (private readonly addFavorite: AddFavorite) {}

  async perform ({ accountId, animeId }: HttpRequest): Promise<void> {
    await this.addFavorite({ accountId, animeId })
  }

  buildValidators ({ animeId, accountId }: HttpRequest): Validator[] {
    return [
      ...build.of(accountId, 'accountId').required().build(),
      ...build.of(animeId, 'animeId').required().build()
    ]
  }
}
