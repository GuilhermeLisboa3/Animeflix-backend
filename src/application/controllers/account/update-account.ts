import { Controller } from '@/application/controllers'
import { HttpResponse, noContent } from '@/application/helpers'
import { UpdateAccount } from '@/domain/usecases/account'

type HttpRequest = {
  accountId: string
  firstName?: string
  lastName?: string
  phone?: string
  birth?: Date
  email?: string
}

export class UpdateAccountController extends Controller {
  constructor (private readonly updateAccount: UpdateAccount) { super() }

  async perform (input: HttpRequest): Promise<HttpResponse> {
    await this.updateAccount(input)
    return noContent()
  }
}
