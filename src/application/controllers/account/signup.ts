import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { Validator, ValidationBuilder as builder } from '@/application/validation'
import { AddAccount } from '@/domain/usecases/account'

type HttpRequest = { firstName: string, lastName: string, phone: string, birth: Date, email: string, password: string }

export class SignUpController extends Controller {
  constructor (private readonly AddAccount: AddAccount) { super() }

  async perform (input: HttpRequest): Promise<HttpResponse> {
    const account = await this.AddAccount(input)
    return ok(account)
  }

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
