import { Validator, ValidationBuilder as build } from '@/application/validation'

type HttpRequest = { email: string, password: string }

export class LoginController {
  buildValidators ({ email, password }: HttpRequest): Validator[] {
    return [
      ...build.of(email, 'email').required().email().build(),
      ...build.of(password, 'password').required().build()
    ]
  }
}
