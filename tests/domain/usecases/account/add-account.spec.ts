import { AddAccount, addAccountUseCase } from '@/domain/usecases/account'
import { CheckAccountByEmail, CreateAccount } from '@/domain/contracts/database/account'
import { HashGenerator } from '@/domain/contracts/gateways'
import { FieldInUseError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddAccount', () => {
  let accountRepository: MockProxy<CheckAccountByEmail & CreateAccount>
  let hash: MockProxy<HashGenerator>
  let sut: AddAccount
  let account: { email: string, password: string, firstName: string, lastName: string, phone: string, birth: Date }
  let hashPassword: string

  beforeAll(() => {
    accountRepository = mock()
    accountRepository.create.mockResolvedValue(true)
    hash = mock()
    hashPassword = 'hash_password'
    hash.generate.mockResolvedValue(hashPassword)
    account = { email: 'any_email', password: 'any_password', firstName: 'any_first_name', lastName: 'any_last_name', phone: 'any_phone', birth: new Date() }
  })

  beforeEach(() => {
    sut = addAccountUseCase(accountRepository, hash)
  })

  it('should call CheckAccountByEmail with correct email', async () => {
    await sut(account)

    expect(accountRepository.checkByEmail).toHaveBeenCalledWith('any_email')
    expect(accountRepository.checkByEmail).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldInUseError if CheckAccountByEmail return true', async () => {
    accountRepository.checkByEmail.mockResolvedValueOnce(true)

    const promise = sut(account)

    await expect(promise).rejects.toThrow(new FieldInUseError('email'))
  })

  it('should rethrow if CheckAccountByEmail throws', async () => {
    const error = new Error('check_error')
    accountRepository.checkByEmail.mockRejectedValueOnce(error)

    const promise = sut(account)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call HashGenerator with correct input', async () => {
    await sut(account)

    expect(hash.generate).toHaveBeenCalledWith({ plaintext: 'any_password' })
    expect(hash.generate).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if HashGenerator throws', async () => {
    const error = new Error('hash_error')
    hash.generate.mockRejectedValueOnce(error)

    const promise = sut(account)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call CreateAccount with correct input', async () => {
    await sut(account)

    expect(accountRepository.create).toHaveBeenCalledWith({ ...account, password: hashPassword })
    expect(accountRepository.create).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if CreateAccount throws', async () => {
    const error = new Error('create_error')
    accountRepository.create.mockRejectedValueOnce(error)

    const promise = sut(account)

    await expect(promise).rejects.toThrow(error)
  })

  it('should return true on success', async () => {
    const createAccount = await sut(account)

    expect(createAccount).toBeTruthy()
  })
})
