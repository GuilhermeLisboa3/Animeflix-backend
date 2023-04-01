import { InvalidMimeTypeError } from '@/application/errors'
import { AllowedMimeTypeValidation } from '@/application/validation'

describe('AllowedMimeTypeValidation', () => {
  it('should return AllowedMimeTypeError if value is invalid', () => {
    const sut = new AllowedMimeTypeValidation(['png'], 'image/jpg')

    const error = sut.validate()

    expect(error).toEqual(new InvalidMimeTypeError(['png']))
  })
})
