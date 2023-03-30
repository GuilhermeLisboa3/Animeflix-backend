import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { ValidationComposite } from '@/application/validation'
import { ServerError } from '@/application/errors/http'

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

  it('should return 500 if perform throws', async () => {
    const error = new Error('perform_error')
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(error)

    const httpResponse = await sut.handle('any_value')

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('should return 500 if perform throws a non error object', async () => {
    jest.spyOn(sut, 'perform').mockRejectedValueOnce({})

    const httpResponse = await sut.handle('any_value')

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError()
    })
  })

  it('should return same result as perform', async () => {
    const httpResponse = await sut.handle('any_value')

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: 'any_value'
    })
  })
})
