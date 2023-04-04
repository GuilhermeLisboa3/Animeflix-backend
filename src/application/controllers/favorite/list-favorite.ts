import { Validator, ValidationBuilder as build } from '@/application/validation'
import { ListFavorite } from '@/domain/usecases/favorite'

type HttpRequest = { accountId: string }

export class ListFavoriteController {
  constructor (private readonly listFavorite: ListFavorite) {}

  async perform ({ accountId }: HttpRequest): Promise<void> {
    await this.listFavorite({ accountId })
  }

  buildValidators ({ accountId }: HttpRequest): Validator[] {
    return [
      ...build.of(accountId, 'accountId').required().build()
    ]
  }
}
