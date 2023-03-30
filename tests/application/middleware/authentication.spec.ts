import { AuthenticationMiddleware } from '@/application/middleware'

import { UnauthorizedError } from '@/application/errors'
import { AuthenticationError } from '@/domain/errors'

describe('AuthenticationMiddleware ', () => {
  let sut: AuthenticationMiddleware
  let authorization: string
  let accessToken: string
  let authorize: jest.Mock
  let role: string

  beforeAll(() => {
    accessToken = 'any_access_token'
    authorization = `Bearer ${accessToken}`
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

  it('should call authorize with correct input', async () => {
    await sut.handle({ authorization })

    expect(authorize).toHaveBeenCalledWith({ accessToken, role })
    expect(authorize).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if authorize return AuthenticationError', async () => {
    authorize.mockRejectedValueOnce(new AuthenticationError())
    const httpResponse = await sut.handle({ authorization })

    expect(httpResponse).toEqual({ statusCode: 401, data: new UnauthorizedError() })
  })
})
