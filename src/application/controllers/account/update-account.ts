import { UpdateAccount } from '@/domain/usecases/account'

type HttpRequest = {
  accountId: string
  firstName?: string
  lastName?: string
  phone?: string
  birth?: Date
  email?: string
}

export class UpdateAccountController {
  constructor (private readonly updateAccount: UpdateAccount) {}

  async perform (input: HttpRequest): Promise<void> {
    await this.updateAccount(input)
  }
}
