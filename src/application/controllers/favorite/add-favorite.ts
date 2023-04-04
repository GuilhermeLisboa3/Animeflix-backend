import { Controller } from '@/application/controllers'
import { HttpResponse, noContent } from '@/application/helpers'
import { Validator, ValidationBuilder as build } from '@/application/validation'
import { AddFavorite } from '@/domain/usecases/favorite'

type HttpRequest = { accountId: string, animeId: number }

export class AddFavoriteController extends Controller {
  constructor (private readonly addFavorite: AddFavorite) { super() }

  async perform ({ accountId, animeId }: HttpRequest): Promise<HttpResponse> {
    await this.addFavorite({ accountId, animeId })
    return noContent()
  }

  override buildValidators ({ animeId, accountId }: HttpRequest): Validator[] {
    return [
      ...build.of(accountId, 'accountId').required().build(),
      ...build.of(animeId, 'animeId').required().build()
    ]
  }
}
