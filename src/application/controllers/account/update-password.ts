import { Validator, ValidationBuilder as builder } from '@/application/validation'

type HttpRequest = {
  accountId: string
  currentPassword: string
  newPassword: string
}

export class UpdatePasswordController {
  buildValidators ({ currentPassword, newPassword }: HttpRequest): Validator[] {
    return [
      ...builder.of(currentPassword, 'currentPassword').required().build(),
      ...builder.of(newPassword, 'newPassword').required().build()
    ]
  }
}
