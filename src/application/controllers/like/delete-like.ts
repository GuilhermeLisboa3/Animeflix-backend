import { Controller } from '@/application/controllers'
import { HttpResponse, noContent } from '@/application/helpers'
import { Validator, ValidationBuilder as build } from '@/application/validation'
import { DeleteLike } from '@/domain/usecases/like'

type HttpRequest = { accountId: string, id: string }

export class DeleteLikeController extends Controller {
  constructor (private readonly deleteLike: DeleteLike) { super() }

  async perform ({ accountId, id }: HttpRequest): Promise<HttpResponse> {
    await this.deleteLike({ accountId, animeId: id })
    return noContent()
  }

  override buildValidators ({ id, accountId }: HttpRequest): Validator[] {
    return [
      ...build.of(accountId, 'accountId').required().build(),
      ...build.of(id, 'id').required().build()
    ]
  }
}
