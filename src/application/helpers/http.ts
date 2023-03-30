import { ServerError, UnauthorizedError } from '@/application/errors/http'

export interface HttpResponse<T = any> {
  statusCode: number
  data: T
}

export const ok = <T = any >(data: T): HttpResponse<T> => ({
  statusCode: 200,
  data: data
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})

export const unauthorized = (): HttpResponse<Error> => ({
  statusCode: 401,
  data: new UnauthorizedError()
})

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error instanceof Error ? error : undefined)
})
