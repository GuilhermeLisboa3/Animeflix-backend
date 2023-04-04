import { Controller } from '@/application/controllers'
import { HttpResponse, noContent } from '@/application/helpers'
import { Validator, ValidationBuilder as build } from '@/application/validation'
import { DeleteLike } from '@/domain/usecases/like'

type HttpRequest = { accountId: string, animeId: string }

export class DeleteLikeController extends Controller {
  constructor (private readonly deleteLike: DeleteLike) { super() }

  async perform ({ accountId, animeId }: HttpRequest): Promise<HttpResponse> {
    await this.deleteLike({ accountId, animeId })
    return noContent()
  }

  override buildValidators ({ animeId, accountId }: HttpRequest): Validator[] {
    return [
      ...build.of(accountId, 'accountId').required().build(),
      ...build.of(animeId, 'animeId').required().build()
    ]
  }
}
