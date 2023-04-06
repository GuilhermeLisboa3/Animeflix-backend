import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { Validator, ValidationBuilder as build } from '@/application/validation'
import { KeepWatchingList } from '@/domain/usecases/account'

type HttpRequest = { accountId: string }

export class GetKeepWatchingListController extends Controller {
  constructor (private readonly keepWatchingList: KeepWatchingList) { super() }

  async perform ({ accountId }: HttpRequest): Promise<HttpResponse> {
    const keepWatchingList = await this.keepWatchingList({ id: accountId })
    return ok(keepWatchingList)
  }

  override buildValidators ({ accountId }: HttpRequest): Validator[] {
    return [
      ...build.of(accountId, 'accountId').required().build()
    ]
  }
}
