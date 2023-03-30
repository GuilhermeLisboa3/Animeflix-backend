import { InvalidFieldError } from '@/application/errors'
import { EmailValidator } from '@/application/validation'

describe('EmailValidator', () => {
  it('should return InvalidFieldError if email is invalid', () => {
    const sut = new EmailValidator('invalid_email', 'email')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('email'))
  })

  it('should return undefined if email is valid', () => {
    const sut = new EmailValidator('valid_email@gmail.com', 'email')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
