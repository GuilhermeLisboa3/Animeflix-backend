import { AuthenticationMiddleware } from '@/application/middleware'

import { UnauthorizedError } from '@/application/errors'

describe('AuthenticationMiddleware ', () => {
  let sut: AuthenticationMiddleware
  let authorize: jest.Mock
  let role: string

  beforeAll(() => {
    authorize = jest.fn().mockResolvedValue({ accountId: 'any_id' })
    role = 'user'
  })

  beforeEach(() => {
    sut = new AuthenticationMiddleware(authorize, role)
  })

  it('should return unauthorized if authorization is empty', async () => {
    const httpResponse = await sut.handle({ authorization: '' })

    expect(httpResponse).toEqual({ statusCode: 401, data: new UnauthorizedError() })
  })

  it('should return unauthorized if authorization is null', async () => {
    const httpResponse = await sut.handle({ authorization: null as any })

    expect(httpResponse).toEqual({ statusCode: 401, data: new UnauthorizedError() })
  })

  it('should return unauthorized if authorization is undefined', async () => {
    const httpResponse = await sut.handle({ authorization: undefined as any })

    expect(httpResponse).toEqual({ statusCode: 401, data: new UnauthorizedError() })
  })
})
