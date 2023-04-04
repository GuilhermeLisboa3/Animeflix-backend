import { HttpResponse, ok } from '@/application/helpers'
import { Validator, ValidationBuilder as build } from '@/application/validation'
import { ListFavorite } from '@/domain/usecases/favorite'

type HttpRequest = { accountId: string }

export class ListFavoriteController {
  constructor (private readonly listFavorite: ListFavorite) {}

  async perform ({ accountId }: HttpRequest): Promise<HttpResponse> {
    const listFavorite = await this.listFavorite({ accountId })
    return ok(listFavorite)
  }

  buildValidators ({ accountId }: HttpRequest): Validator[] {
    return [
      ...build.of(accountId, 'accountId').required().build()
    ]
  }
}
