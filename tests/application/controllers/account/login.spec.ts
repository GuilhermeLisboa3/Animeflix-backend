import { LoginController } from '@/application/controllers/account'
import { EmailValidator, RequiredField } from '@/application/validation'

describe('LoginController', () => {
  let sut: LoginController
  let makeRequest: { email: string, password: string }
  let authentication: jest.Mock

  beforeAll(() => {
    makeRequest = { email: 'any_email@gmail.com', password: 'any_password' }
    authentication = jest.fn()
  })

  beforeEach(() => {
    sut = new LoginController(authentication)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('any_email@gmail.com', 'email'),
      new EmailValidator('any_email@gmail.com', 'email'),
      new RequiredField('any_password', 'password')
    ])
  })

  it('should call Authentication with correct input', async () => {
    await sut.perform(makeRequest)

    expect(authentication).toHaveBeenCalledWith(makeRequest)
    expect(authentication).toHaveBeenCalledTimes(1)
  })
})
