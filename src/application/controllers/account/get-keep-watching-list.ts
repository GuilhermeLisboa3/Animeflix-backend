import { Validator, ValidationBuilder as build } from '@/application/validation'
import { KeepWatchingList } from '@/domain/usecases/account'

type HttpRequest = { accountId: string }

export class GetKeepWatchingListController {
  constructor (private readonly keepWatchingList: KeepWatchingList) {}

  async perform ({ accountId }: HttpRequest): Promise<void> {
    await this.keepWatchingList({ id: accountId })
  }

  buildValidators ({ accountId }: HttpRequest): Validator[] {
    return [
      ...build.of(accountId, 'accountId').required().build()
    ]
  }
}
