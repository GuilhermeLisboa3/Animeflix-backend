import { HttpResponse, noContent } from '@/application/helpers'
import { Validator, ValidationBuilder as build } from '@/application/validation'
import { DeleteFavorite } from '@/domain/usecases/favorite'

type HttpRequest = { accountId: string, animeId: string }

export class DeleteFavoriteController {
  constructor (private readonly deleteFavorite: DeleteFavorite) {}

  async perform ({ accountId, animeId }: HttpRequest): Promise<HttpResponse> {
    await this.deleteFavorite({ accountId, animeId })
    return noContent()
  }

  buildValidators ({ animeId, accountId }: HttpRequest): Validator[] {
    return [
      ...build.of(accountId, 'accountId').required().build(),
      ...build.of(animeId, 'animeId').required().build()
    ]
  }
}