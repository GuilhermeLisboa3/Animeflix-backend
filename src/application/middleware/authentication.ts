import { HttpResponse, unauthorized } from '@/application/helpers'
import { Authorize } from '@/domain/usecases/account'

type HttpRequest = { authorization: string }

export class AuthenticationMiddleware {
  constructor (
    private readonly authorize: Authorize,
    private readonly role?: string
  ) {}

  async handle ({ authorization }: HttpRequest): Promise<HttpResponse | undefined> {
    if (!authorization) return unauthorized()
  }
}
