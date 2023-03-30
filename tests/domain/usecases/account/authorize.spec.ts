import { Authorize, AuthorizeUseCase } from '@/domain/usecases/account'
import { TokenValidator } from '@/domain/contracts/gateways'

import { mock, MockProxy } from 'jest-mock-extended'
import { AuthenticationError } from '@/domain/errors'

describe('AuthorizeUseCase', () => {
  let token: MockProxy<TokenValidator>
  let sut: Authorize
  let makeParams: { accessToken: string, role?: string }

  beforeAll(() => {
    token = mock()
    makeParams = { accessToken: 'any_token', role: 'any_role' }
  })

  beforeEach(() => {
    sut = AuthorizeUseCase(token)
  })

  it('should call TokenValidator with correct input', async () => {
    await sut(makeParams)

    expect(token.validate).toHaveBeenCalledWith({ token: 'any_token' })
    expect(token.validate).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError if TokenValidator throw', async () => {
    token.validate.mockRejectedValueOnce(new Error('any_error'))

    const promise = sut(makeParams)

    await expect(promise).rejects.toThrow(new AuthenticationError())
  })
})
