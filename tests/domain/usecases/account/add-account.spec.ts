import { AddAccount, addAccountUseCase } from '@/domain/usecases/account'
import { CheckAccountByEmail } from '@/domain/contracts/database/account'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddAccount', () => {
  let accountRepository: MockProxy<CheckAccountByEmail>
  let sut: AddAccount
  let account: { email: string, password: string, firstName: string, lastName: string, phone: string, birth: Date }

  beforeAll(() => {
    accountRepository = mock()
    account = { email: 'any_email', password: 'any_password', firstName: 'any_first_name', lastName: 'any_last_name', phone: 'any_phone', birth: new Date() }
  })

  beforeEach(() => {
    sut = addAccountUseCase(accountRepository)
  })

  it('should call CheckAccountByEmail with correct email', async () => {
    await sut(account)

    expect(accountRepository.checkByEmail).toHaveBeenCalledWith('any_email')
    expect(accountRepository.checkByEmail).toHaveBeenCalledTimes(1)
  })
})
