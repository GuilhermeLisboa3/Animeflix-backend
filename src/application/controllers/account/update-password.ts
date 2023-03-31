import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { UpdateAccount } from '@/domain/usecases/account'

type HttpRequest = {
  accountId: string
  currentPassword: string
  newPassword: string
}

export class UpdatePasswordController {
  constructor (private readonly updateAccount: UpdateAccount) {}

  async perform (input: HttpRequest): Promise<void> {
    await this.updateAccount(input)
  }

  buildValidators ({ currentPassword, newPassword }: HttpRequest): Validator[] {
    return [
      ...builder.of(currentPassword, 'currentPassword').required().build(),
      ...builder.of(newPassword, 'newPassword').required().build()
    ]
  }
}
