import { HttpResponse, unauthorized } from '@/application/helpers'
import { AuthenticationError } from '@/domain/errors'
import { Authorize } from '@/domain/usecases/account'

type HttpRequest = { authorization: string }

export class AuthenticationMiddleware {
  constructor (
    private readonly authorize: Authorize,
    private readonly role?: string
  ) {}

  async handle ({ authorization }: HttpRequest): Promise<HttpResponse | undefined> {
    try {
      if (!authorization) return unauthorized()
      const accessToken = authorization.split(' ')[1]
      await this.authorize({ accessToken, role: this.role })
    } catch (error) {
      if (error instanceof AuthenticationError) return unauthorized()
    }
  }
}