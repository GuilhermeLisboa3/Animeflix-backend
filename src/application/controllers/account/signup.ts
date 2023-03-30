import { Validator, ValidationBuilder as builder } from '@/application/validation'

type HttpRequest = { firstName: string, lastName: string, phone: string, birth: Date, email: string, password: string }

export class SignUpController {
  buildValidators ({ firstName, lastName, email, password, birth, phone }: HttpRequest): Validator[] {
    return [
      ...builder.of(firstName, 'firstName').required().build(),
      ...builder.of(lastName, 'lastName').required().build(),
      ...builder.of(email, 'email').required().email().build(),
      ...builder.of(password, 'password').required().build(),
      ...builder.of(birth, 'birth').required().build(),
      ...builder.of(phone, 'phone').required().build()
    ]
  }
}
