import { AwsS3FileStorage } from '@/infra/gateways'

import { config } from 'aws-sdk'

jest.mock('aws-sdk')

describe('AwsS3FileStorage', () => {
  let sut: AwsS3FileStorage
  let accessKeyId: string
  let secretAccessKey: string

  beforeAll(() => {
    accessKeyId = 'any_access_key'
    secretAccessKey = 'any_secret'
  })

  beforeEach(() => {
    sut = new AwsS3FileStorage(accessKeyId, secretAccessKey)
  })

  it('should config aws credentials on creation', () => {
    expect(sut)
    expect(config.update).toHaveBeenCalledWith({ credentials: { accessKeyId, secretAccessKey } })
    expect(config.update).toHaveBeenCalledTimes(1)
  })
})
