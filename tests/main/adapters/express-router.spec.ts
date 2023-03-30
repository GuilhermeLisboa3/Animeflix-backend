import { Controller } from '@/application/controllers'
import { expressRouterAdapter } from '@/main/adapters'

import { getMockReq, getMockRes } from '@jest-mock/express'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { mock, MockProxy } from 'jest-mock-extended'

describe('Express Router', () => {
  let controller: MockProxy<Controller>
  let req: Request
  let res: Response
  let next: NextFunction
  let sut: RequestHandler

  beforeAll(() => {
    controller = mock<Controller>()
    req = getMockReq({ body: { anyBody: 'any_body' }, params: { id: 'any_id' }, query: { anyQuery: 'any_query' } })
    res = getMockRes().res
    next = getMockRes().next
  })

  beforeEach(() => {
    sut = expressRouterAdapter(controller)
  })

  it('should call handle with correct request', async () => {
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({ anyBody: 'any_body', id: 'any_id', anyQuery: 'any_query' })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should call handle with empty request', async () => {
    const req = getMockReq()

    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({})
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })
})
