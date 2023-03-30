import { Middleware } from '@/application/middleware'
import { expressMiddlewareAdapter } from '@/main/adapters'

import { mock, MockProxy } from 'jest-mock-extended'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { NextFunction, Request, RequestHandler, Response } from 'express'

describe('Express Middleware', () => {
  let middleware: MockProxy<Middleware>
  let req: Request
  let res: Response
  let next: NextFunction
  let sut: RequestHandler

  beforeAll(() => {
    middleware = mock<Middleware>()
    middleware.handle.mockResolvedValue({ statusCode: 200, data: { key: 'any_key', null: null, undefined: undefined, empty: '' } })
  })

  beforeEach(() => {
    sut = expressMiddlewareAdapter(middleware)
    req = getMockReq({ headers: { authorization: 'any_value' }, query: { test: 'any_test' } })
    res = getMockRes().res
    next = getMockRes().next
  })

  it('should call handle with correct input', async () => {
    await sut(req, res, next)

    expect(middleware.handle).toHaveBeenCalledWith({ authorization: 'any_value', test: 'any_test' })
    expect(middleware.handle).toHaveBeenCalledTimes(1)
  })
})
