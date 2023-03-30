import { LoginController } from '@/application/controllers/account'
import { EmailValidator, RequiredField } from '@/application/validation'

describe('LoginController', () => {
  let sut: LoginController
  let makeRequest: { email: string, password: string }

  beforeAll(() => {
    makeRequest = { email: 'any_email@gmail.com', password: 'any_password' }
  })

  beforeEach(() => {
    sut = new LoginController()
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('any_email@gmail.com', 'email'),
      new EmailValidator('any_email@gmail.com', 'email'),
      new RequiredField('any_password', 'password')
    ])
  })
})
