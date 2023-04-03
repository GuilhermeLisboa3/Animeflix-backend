import { Controller } from '@/application/controllers'
import { HttpResponse, noContent } from '@/application/helpers'
import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { UpdateAccount } from '@/domain/usecases/account'

type HttpRequest = {
  accountId: string
  currentPassword: string
  newPassword: string
}

export class UpdatePasswordController extends Controller {
  constructor (private readonly updateAccount: UpdateAccount) { super() }

  async perform (input: HttpRequest): Promise<HttpResponse> {
    await this.updateAccount(input)
    return noContent()
  }

  override buildValidators ({ currentPassword, newPassword }: HttpRequest): Validator[] {
    return [
      ...builder.of(currentPassword, 'currentPassword').required().build(),
      ...builder.of(newPassword, 'newPassword').required().build()
    ]
  }
}
