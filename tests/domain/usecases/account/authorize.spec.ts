import { Authorize, AuthorizeUseCase } from '@/domain/usecases/account'
import { TokenValidator } from '@/domain/contracts/gateways'
import { CheckAccountRole } from '@/domain/contracts/database/account'
import { AuthenticationError, InsuficientPermissionError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AuthorizeUseCase', () => {
  let token: MockProxy<TokenValidator>
  let accountRepository: MockProxy<CheckAccountRole>
  let sut: Authorize
  let makeParams: { accessToken: string, role?: string }

  beforeAll(() => {
    token = mock()
    token.validate.mockResolvedValue('any_id')
    accountRepository = mock()
    accountRepository.checkRole.mockResolvedValue(true)
    makeParams = { accessToken: 'any_token', role: 'any_role' }
  })

  beforeEach(() => {
    sut = AuthorizeUseCase(token, accountRepository)
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

  it('should call CheckAccountRole with correct input', async () => {
    await sut(makeParams)

    expect(accountRepository.checkRole).toHaveBeenCalledWith({ accountId: 'any_id', role: 'any_role' })
    expect(accountRepository.checkRole).toHaveBeenCalledTimes(1)
  })

  it('should return InsuficientPermissionError if CheckAccountRole returns false', async () => {
    accountRepository.checkRole.mockResolvedValueOnce(false)

    const promise = sut(makeParams)

    await expect(promise).rejects.toThrow(new InsuficientPermissionError())
  })
})
