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
    controller.handle.mockResolvedValue({ statusCode: 200, data: { data: 'any_value' } })
    req = getMockReq({ body: { anyBody: 'any_body' }, params: { id: 'any_id' }, query: { anyQuery: 'any_query' }, locals: { anyLocals: 'any_locals' } })
    res = getMockRes().res
    next = getMockRes().next
  })

  beforeEach(() => {
    sut = expressRouterAdapter(controller)
  })

  it('should call handle with correct request', async () => {
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({ anyBody: 'any_body', id: 'any_id', anyQuery: 'any_query', anyLocals: 'any_locals' })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should call handle with empty request', async () => {
    const req = getMockReq()

    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({})
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should respond with correct statusCode and data on success', async () => {
    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ data: 'any_value' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('should respond with correct statusCode and error on failure', async () => {
    controller.handle.mockResolvedValue({ statusCode: 400, data: new Error('server_error') })

    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'server_error' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
