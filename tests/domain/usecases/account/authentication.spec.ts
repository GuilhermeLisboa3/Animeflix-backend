import { AuthenticationUseCase, Authentication } from '@/domain/usecases/account'
import { LoadAccountByEmail } from '@/domain/contracts/database/account'
import { HashComparer, TokenGenerator } from '@/domain/contracts/gateways'
import { AuthenticationError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('Authentication', () => {
  let accountRepository: MockProxy<LoadAccountByEmail>
  let hashCompare: MockProxy<HashComparer>
  let token: MockProxy<TokenGenerator>
  let sut: Authentication
  let loginAccount: { email: string, password: string }

  beforeAll(() => {
    accountRepository = mock()
    accountRepository.loadByEmail.mockResolvedValue({ id: 'any_id', password: 'any_password_data' })
    hashCompare = mock()
    hashCompare.comparer.mockResolvedValue(true)
    token = mock()
    token.generate.mockResolvedValue('any_access_token')
    loginAccount = { email: 'any_email@gmail.com', password: 'any_password' }
  })

  beforeEach(() => {
    sut = AuthenticationUseCase(accountRepository, hashCompare, token)
  })

  it('should call LoadAccountByEmail with correct email', async () => {
    await sut(loginAccount)

    expect(accountRepository.loadByEmail).toHaveBeenCalledWith('any_email@gmail.com')
    expect(accountRepository.loadByEmail).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError if LoadAccountByEmail returns undefined', async () => {
    accountRepository.loadByEmail.mockResolvedValueOnce(undefined)

    const promise = sut(loginAccount)

    await expect(promise).rejects.toThrow(new AuthenticationError())
  })

  it('should rethrow if LoadAccountByEmail throw', async () => {
    const error = new Error()
    accountRepository.loadByEmail.mockRejectedValueOnce(error)

    const promise = sut(loginAccount)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call hashComparer with correct input', async () => {
    await sut(loginAccount)

    expect(hashCompare.comparer).toHaveBeenCalledWith({ plaintext: 'any_password', digest: 'any_password_data' })
    expect(hashCompare.comparer).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError if hashComparer returns false', async () => {
    hashCompare.comparer.mockResolvedValueOnce(false)

    const promise = sut(loginAccount)

    await expect(promise).rejects.toThrow(new AuthenticationError())
  })

  it('should rethrow if hashComparer throw', async () => {
    const error = new Error()
    hashCompare.comparer.mockRejectedValueOnce(error)

    const promise = sut(loginAccount)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call TokenGenerator with correct input', async () => {
    await sut(loginAccount)

    expect(token.generate).toHaveBeenCalledWith({ key: 'any_id' })
    expect(token.generate).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if TokenGenerator throw', async () => {
    const error = new Error()
    token.generate.mockRejectedValueOnce(error)

    const promise = sut(loginAccount)

    await expect(promise).rejects.toThrow(error)
  })

  it('should return an accessToken on success', async () => {
    const accessToken = await sut(loginAccount)

    expect(accessToken).toEqual({ accessToken: 'any_access_token' })
  })
})
