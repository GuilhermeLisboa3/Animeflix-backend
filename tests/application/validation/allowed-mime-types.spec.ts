import { InvalidMimeTypeError } from '@/application/errors'
import { AllowedMimeTypeValidation } from '@/application/validation'

describe('AllowedMimeTypeValidation', () => {
  it('should return AllowedMimeTypeError if value is invalid', () => {
    const sut = new AllowedMimeTypeValidation(['png'], 'image/jpg')

    const error = sut.validate()

    expect(error).toEqual(new InvalidMimeTypeError(['png']))
  })

  it('should return undefined if value is valid', () => {
    const sut = new AllowedMimeTypeValidation(['png'], 'image/png')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('should return undefined if value is valid', () => {
    const sut = new AllowedMimeTypeValidation(['jpg'], 'image/jpg')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('should return undefined if value is valid', () => {
    const sut = new AllowedMimeTypeValidation(['jpg'], 'image/jpeg')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
