import { SignUpController } from '@/application/controllers/account'
import { RequiredField, EmailValidator } from '@/application/validation'

import MockDate from 'mockdate'

describe('SignUpController', () => {
  let sut: SignUpController
  let makeRequest: { firstName: string, lastName: string, email: string, password: string, birth: Date, phone: string }

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
  })

  beforeEach(() => {
    sut = new SignUpController()
  })

  afterAll(() => {
    MockDate.reset()
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
})
