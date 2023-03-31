import { AwsS3FileStorage } from '@/infra/gateways'

import { config, S3 } from 'aws-sdk'

jest.mock('aws-sdk')

describe('AwsS3FileStorage', () => {
  let sut: AwsS3FileStorage
  let accessKeyId: string
  let secretAccessKey: string
  let bucket: string

  beforeAll(() => {
    accessKeyId = 'any_access_key'
    secretAccessKey = 'any_secret'
    bucket = 'any_bucket'
  })

  beforeEach(() => {
    sut = new AwsS3FileStorage(accessKeyId, secretAccessKey, bucket)
  })

  it('should config aws credentials on creation', () => {
    expect(sut)
    expect(config.update).toHaveBeenCalledWith({ credentials: { accessKeyId, secretAccessKey } })
    expect(config.update).toHaveBeenCalledTimes(1)
  })

  describe('upload', () => {
    let file: Buffer
    let fileName: string
    let promiseSpy: jest.Mock
    let uploadSpy: jest.Mock

    beforeAll(() => {
      file = Buffer.from('any_value')
      fileName = 'any_name'
      promiseSpy = jest.fn()
      uploadSpy = jest.fn().mockImplementation(jest.fn().mockImplementation(() => ({ promise: promiseSpy })))
      jest.mocked(S3).mockImplementation(jest.fn().mockImplementation(() => ({ upload: uploadSpy })))
    })

    it('should call putObject with correct values', async () => {
      await sut.upload({ file, fileName })

      expect(uploadSpy).toHaveBeenCalledWith({ Bucket: bucket, Body: file, Key: fileName, ACL: 'public-read' })
      expect(uploadSpy).toHaveBeenCalledTimes(1)
      expect(promiseSpy).toHaveBeenCalledTimes(1)
    })
  })
})
