import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { ValidationComposite } from '@/application/validation'

jest.mock('@/application/validation/composite')

class ControllerStub extends Controller {
  async perform (httpRequest: any): Promise<HttpResponse> {
    return { statusCode: 200, data: httpRequest }
  }
}

describe('Controller', () => {
  let sut: Controller

  beforeEach(() => {
    sut = new ControllerStub()
  })

  it('should return 400 if Validation fails', async () => {
    const error = new Error('validation_error')
    const ValidationCompositeStub = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    jest.mocked(ValidationComposite).mockImplementationOnce(ValidationCompositeStub)

    const httpResponse = await sut.handle('any_value')

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('validation_error')
    })
  })
})
