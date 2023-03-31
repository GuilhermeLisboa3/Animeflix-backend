import { LoadAccountById } from '@/domain/contracts/database/account'
import { HashComparer } from '@/domain/contracts/gateways'
import { CompareFieldsError } from '@/domain/errors'
import { UpdateAccountUseCase, UpdateAccount } from '@/domain/usecases/account'

import { mock, MockProxy } from 'jest-mock-extended'

describe('Update Account', () => {
  let accountRepository: MockProxy<LoadAccountById>
  let sut: UpdateAccount
  let hash: MockProxy<HashComparer>
  let makeAccount: { accountId: string, currentPassword: string, newPassword: string }

  beforeAll(() => {
    makeAccount = { accountId: 'any_id', currentPassword: 'any_password', newPassword: 'new_password' }
    accountRepository = mock()
    accountRepository.loadById.mockResolvedValue({ firstName: 'any_name', lastName: 'any_last_name', email: 'any_email', password: 'account_password', birth: new Date(), phone: 'any_phone', role: 'user' })
    hash = mock()
    hash.comparer.mockResolvedValue(true)
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
})
