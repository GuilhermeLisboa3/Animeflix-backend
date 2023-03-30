import { Validator, ValidationBuilder as build } from '@/application/validation'
import { Authentication } from '@/domain/usecases/account'

type HttpRequest = { email: string, password: string }

export class LoginController {
  constructor (private readonly authentication: Authentication) {}

  async perform ({ email, password }: HttpRequest): Promise<void> {
    await this.authentication({ email, password })
  }

  buildValidators ({ email, password }: HttpRequest): Validator[] {
    return [
      ...build.of(email, 'email').required().email().build(),
      ...build.of(password, 'password').required().build()
    ]
  }
}
