import { LoadAccountById } from '@/domain/contracts/database/account'
import { UpdateAccountUseCase, UpdateAccount } from '@/domain/usecases/account'

import { mock, MockProxy } from 'jest-mock-extended'

describe('Update Account', () => {
  let accountRepository: MockProxy<LoadAccountById>
  let sut: UpdateAccount
  let makeAccount: { accountId: string, currentPassword: string, newPassword: string }

  beforeAll(() => {
    makeAccount = { accountId: 'any_id', currentPassword: 'any_password', newPassword: 'new_password' }
    accountRepository = mock()
  })

  beforeEach(() => {
    sut = UpdateAccountUseCase(accountRepository)
  })

  it('should call loadAccountById with correct input', async () => {
    await sut(makeAccount)

    expect(accountRepository.loadById).toHaveBeenCalledWith({ id: 'any_id' })
    expect(accountRepository.loadById).toHaveBeenCalledTimes(1)
  })
})
