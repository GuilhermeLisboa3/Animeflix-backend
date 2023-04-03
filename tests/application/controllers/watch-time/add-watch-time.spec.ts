import { AddWatchTimeController } from '@/application/controllers/watch-time'
import { RequiredField } from '@/application/validation'
import { Controller } from '@/application/controllers'

describe('AddWatchTimeController', () => {
  let makeRequest: { accountId: string, id: string, seconds: number }
  let sut: AddWatchTimeController
  let AddWatchTime: jest.Mock

  beforeAll(() => {
    makeRequest = { accountId: '1', id: '1', seconds: 1 }
    AddWatchTime = jest.fn()
  })

  beforeEach(() => {
    sut = new AddWatchTimeController(AddWatchTime)
  })

  it('should extends Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(makeRequest)

    expect(validators).toEqual([
      new RequiredField('1', 'id'),
      new RequiredField(1, 'seconds')
    ])
  })

  it('should call AddWatchTime with correct input', async () => {
    await sut.perform(makeRequest)

    expect(AddWatchTime).toHaveBeenCalledWith({ accountId: 1, episodeId: 1, seconds: 1 })
    expect(AddWatchTime).toHaveBeenCalledTimes(1)
  })

  it('should return 204 on success', async () => {
    const httpResponse = await sut.perform(makeRequest)

    expect(httpResponse).toEqual({
      statusCode: 204,
      data: null
    })
  })
})
