import { AddAccount, addAccountUseCase } from '@/domain/usecases/account'
import { CheckAccountByEmail } from '@/domain/contracts/database/account'
import { HashGenerator } from '@/domain/contracts/gateways'
import { FieldInUseError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddAccount', () => {
  let accountRepository: MockProxy<CheckAccountByEmail>
  let hash: MockProxy<HashGenerator>
  let sut: AddAccount
  let account: { email: string, password: string, firstName: string, lastName: string, phone: string, birth: Date }

  beforeAll(() => {
    accountRepository = mock()
    accountRepository.checkByEmail.mockResolvedValue(false)
    hash = mock()
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

  it('should call HashGenerator with correct input', async () => {
    await sut(account)

    expect(hash.generate).toHaveBeenCalledWith({ plaintext: 'any_password' })
    expect(hash.generate).toHaveBeenCalledTimes(1)
  })
})
