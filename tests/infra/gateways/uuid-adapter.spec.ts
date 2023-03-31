import { UUIDAdapter } from '@/infra/gateways'

import { v4 as uuidV4 } from 'uuid'

jest.mock('uuid')

describe('UUIDAdapter', () => {
  let sut: UUIDAdapter

  beforeAll(() => {
    jest.mocked(uuidV4).mockReturnValue('any_uuid')
  })

  beforeEach(() => {
    sut = new UUIDAdapter()
  })

  it('should call uuidV4', () => {
    sut.generate()

    expect(uuidV4).toHaveBeenCalledWith()
    expect(uuidV4).toHaveBeenCalledTimes(1)
  })
})
