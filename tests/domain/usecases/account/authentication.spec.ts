import { AuthenticationUseCase, Authentication } from '@/domain/usecases/account'
import { LoadAccountByEmail } from '@/domain/contracts/database/account'

import { mock, MockProxy } from 'jest-mock-extended'

describe('Authentication', () => {
  let accountRepository: MockProxy<LoadAccountByEmail>
  let sut: Authentication
  let loginAccount: { email: string, password: string }

  beforeAll(() => {
    accountRepository = mock()
    loginAccount = { email: 'any_email@gmail.com', password: 'any_password' }
  })

  beforeEach(() => {
    sut = AuthenticationUseCase(accountRepository)
  })

  it('should call LoadAccountByEmail with correct email', async () => {
    await sut(loginAccount)

    expect(accountRepository.loadByEmail).toHaveBeenCalledWith('any_email@gmail.com')
    expect(accountRepository.loadByEmail).toHaveBeenCalledTimes(1)
  })
})
