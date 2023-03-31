import { LoadAccountById, UpdateAccountById } from '@/domain/contracts/database/account'
import { HashComparer, HashGenerator } from '@/domain/contracts/gateways'
import { CompareFieldsError } from '@/domain/errors'
import { UpdateAccountUseCase, UpdateAccount } from '@/domain/usecases/account'

import { mock, MockProxy } from 'jest-mock-extended'

describe('Update Account', () => {
  let accountRepository: MockProxy<LoadAccountById & UpdateAccountById>
  let sut: UpdateAccount
  let hash: MockProxy<HashComparer & HashGenerator>
  let makeAccount: { accountId: string, currentPassword: string, newPassword: string }

  beforeAll(() => {
    makeAccount = { accountId: 'any_id', currentPassword: 'any_password', newPassword: 'new_password' }
    accountRepository = mock()
    accountRepository.loadById.mockResolvedValue({ firstName: 'any_name', lastName: 'any_last_name', email: 'any_email', password: 'account_password', birth: new Date(), phone: 'any_phone', role: 'user' })
    hash = mock()
    hash.comparer.mockResolvedValue(true)
    hash.generate.mockResolvedValue('hash_password')
  })

  beforeEach(() => {
    sut = UpdateAccountUseCase(accountRepository, hash)
  })

  it('should call loadAccountById with correct input', async () => {
    await sut(makeAccount)

    expect(accountRepository.loadById).toHaveBeenCalledWith({ id: 'any_id' })
    expect(accountRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('should call HashComparer with correct input', async () => {
    await sut(makeAccount)

    expect(hash.comparer).toHaveBeenCalledWith({ plaintext: 'any_password', digest: 'account_password' })
    expect(hash.comparer).toHaveBeenCalledTimes(1)
  })

  it('should return CompareFieldsError if HashComparer returns false', async () => {
    hash.comparer.mockResolvedValueOnce(false)

    const promise = sut(makeAccount)

    await expect(promise).rejects.toThrow(new CompareFieldsError('currentPassword', 'password'))
  })

  it('should call HashGenerator with correct input', async () => {
    await sut(makeAccount)

    expect(hash.generate).toHaveBeenCalledWith({ plaintext: 'new_password' })
    expect(hash.generate).toHaveBeenCalledTimes(1)
  })

  it('should call UpdateAccount with correct input', async () => {
    await sut(makeAccount)

    expect(accountRepository.update).toHaveBeenCalledWith({ id: 'any_id', password: 'hash_password' })
    expect(accountRepository.update).toHaveBeenCalledTimes(1)
  })
})
