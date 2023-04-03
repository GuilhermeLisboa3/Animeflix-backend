import { Middleware } from '@/application/middleware'
import { forbidden, HttpResponse, ok, serverError, unauthorized } from '@/application/helpers'
import { AuthenticationError, InsuficientPermissionError } from '@/domain/errors'
import { Authorize } from '@/domain/usecases/account'

type HttpRequest = { authorization: string, token: string }
type Model = { accountId: string } | Error

export class AuthenticationMiddleware implements Middleware {
  constructor (
    private readonly authorize: Authorize,
    private readonly role?: string
  ) {}

  async handle ({ authorization, token }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      if (!authorization && !token) return unauthorized()
      let accessToken: string | undefined
      if (authorization) accessToken = authorization.split(' ')[1]
      const accountId = await this.authorize({ accessToken: accessToken ?? token, role: this.role })
      return ok(accountId)
    } catch (error) {
      if (error instanceof AuthenticationError) return unauthorized()
      if (error instanceof InsuficientPermissionError) return forbidden()
      return serverError(error)
    }
  }
}
