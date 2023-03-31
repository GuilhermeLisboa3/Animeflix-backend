import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { GetAccountData } from '@/domain/usecases/account'

type HttpRequest = { accountId: string }

export class GetAccountDataController extends Controller {
  constructor (private readonly getAccountData: GetAccountData) { super() }

  async perform ({ accountId }: HttpRequest): Promise<HttpResponse> {
    const account = await this.getAccountData({ id: accountId })
    return ok(account)
  }
}
