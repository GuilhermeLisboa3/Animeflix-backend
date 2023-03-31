import { HttpResponse, noContent } from '@/application/helpers'
import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { UpdateAccount } from '@/domain/usecases/account'

type HttpRequest = {
  accountId: string
  currentPassword: string
  newPassword: string
}

export class UpdatePasswordController {
  constructor (private readonly updateAccount: UpdateAccount) {}

  async perform (input: HttpRequest): Promise<HttpResponse> {
    await this.updateAccount(input)
    return noContent()
  }

  buildValidators ({ currentPassword, newPassword }: HttpRequest): Validator[] {
    return [
      ...builder.of(currentPassword, 'currentPassword').required().build(),
      ...builder.of(newPassword, 'newPassword').required().build()
    ]
  }
}
