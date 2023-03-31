import { GetAccountData } from '@/domain/usecases/account'

type HttpRequest = { accountId: string }

export class GetAccountDataController {
  constructor (private readonly getAccountData: GetAccountData) { }

  async perform ({ accountId }: HttpRequest): Promise<void> {
    await this.getAccountData({ id: accountId })
  }
}
