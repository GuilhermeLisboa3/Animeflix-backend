import { LoginController } from '@/application/controllers/account'
import { Controller } from '@/application/controllers'
import { EmailValidator, RequiredField } from '@/application/validation'
import { AuthenticationError } from '@/domain/errors'
import { UnauthorizedError } from '@/application/errors/http'

describe('LoginController', () => {
  let sut: LoginController
  let makeRequest: { email: string, password: string }
  let authentication: jest.Mock

  beforeAll(() => {
    makeRequest = { email: 'any_email@gmail.com', password: 'any_password' }
    authentication = jest.fn().mockResolvedValue({ accesstoken: 'any_access_token' })
  })

  beforeEach(() => {
    sut = new LoginController(authentication)
  })

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
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

  it('should return 401 if Authentication returns AuthenticationError', async () => {
    authentication.mockRejectedValueOnce(new AuthenticationError())

    const httpResponse = await sut.handle(makeRequest)

    expect(httpResponse).toEqual({ statusCode: 401, data: new UnauthorizedError() })
  })

  it('should return 200 on success', async () => {
    const httpResponse = await sut.perform(makeRequest)

    expect(httpResponse).toEqual({ statusCode: 200, data: { accesstoken: 'any_access_token' } })
  })
})
