import { SignUpController } from '@/application/controllers/account'
import { Controller } from '@/application/controllers'
import { RequiredField, EmailValidator } from '@/application/validation'

import MockDate from 'mockdate'

describe('SignUpController', () => {
  let sut: SignUpController
  let makeRequest: { firstName: string, lastName: string, email: string, password: string, birth: Date, phone: string }
  let AddAccount: jest.Mock

  beforeAll(() => {
    MockDate.set(new Date())
    makeRequest = {
      firstName: 'any_name',
      lastName: 'any_last_name',
      email: 'any_email@gmail.com',
      password: 'any_password',
      birth: new Date(),
      phone: 'any_phone'
    }
    AddAccount = jest.fn().mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = new SignUpController(AddAccount)
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('any_name', 'firstName'),
      new RequiredField('any_last_name', 'lastName'),
      new RequiredField('any_email@gmail.com', 'email'),
      new EmailValidator('any_email@gmail.com', 'email'),
      new RequiredField('any_password', 'password'),
      new RequiredField(new Date(), 'birth'),
      new RequiredField('any_phone', 'phone')
    ])
  })

  it('should call AddAccount with correct input', async () => {
    await sut.perform(makeRequest)

    expect(AddAccount).toHaveBeenCalledWith(makeRequest)
    expect(AddAccount).toHaveBeenCalledTimes(1)
  })

  it('should return 200 on success', async () => {
    const httpResponse = await sut.perform(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: true
    })
  })
})
