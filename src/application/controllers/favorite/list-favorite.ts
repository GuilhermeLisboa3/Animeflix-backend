import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { Validator, ValidationBuilder as build } from '@/application/validation'
import { ListFavorite } from '@/domain/usecases/favorite'

type HttpRequest = { accountId: string }

export class ListFavoriteController extends Controller {
  constructor (private readonly listFavorite: ListFavorite) { super() }

  async perform ({ accountId }: HttpRequest): Promise<HttpResponse> {
    const listFavorite = await this.listFavorite({ accountId })
    return ok(listFavorite)
  }

  override buildValidators ({ accountId }: HttpRequest): Validator[] {
    return [
      ...build.of(accountId, 'accountId').required().build()
    ]
  }
}
