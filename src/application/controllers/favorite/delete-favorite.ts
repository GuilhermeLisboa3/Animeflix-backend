import { Controller } from '@/application/controllers'
import { HttpResponse, noContent } from '@/application/helpers'
import { Validator, ValidationBuilder as build } from '@/application/validation'
import { DeleteFavorite } from '@/domain/usecases/favorite'

type HttpRequest = { accountId: string, id: string }

export class DeleteFavoriteController extends Controller {
  constructor (private readonly deleteFavorite: DeleteFavorite) { super() }

  async perform ({ accountId, id }: HttpRequest): Promise<HttpResponse> {
    await this.deleteFavorite({ accountId, animeId: id })
    return noContent()
  }

  override buildValidators ({ id, accountId }: HttpRequest): Validator[] {
    return [
      ...build.of(accountId, 'accountId').required().build(),
      ...build.of(id, 'id').required().build()
    ]
  }
}
