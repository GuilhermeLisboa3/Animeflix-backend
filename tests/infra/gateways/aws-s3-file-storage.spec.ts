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

    it('should return url on success', async () => {
      const url = await sut.upload({ file, fileName: 'any name' })

      expect(url).toBe(`https://${bucket}.s3.amazonaws.com/any%20name`)
    })
  })

  describe('delete', () => {
    let fileName: string
    let promiseSpy: jest.Mock
    let deleteObjectSpy: jest.Mock

    beforeAll(() => {
      fileName = 'any_name'
      promiseSpy = jest.fn()
      deleteObjectSpy = jest.fn().mockImplementation(jest.fn().mockImplementation(() => ({ promise: promiseSpy })))
      jest.mocked(S3).mockImplementation(jest.fn().mockImplementation(() => ({ deleteObject: deleteObjectSpy })))
    })

    it('should call deleteObject with correct values', async () => {
      await sut.delete({ fileName })

      expect(deleteObjectSpy).toHaveBeenCalledWith({ Bucket: bucket, Key: fileName })
      expect(deleteObjectSpy).toHaveBeenCalledTimes(1)
      expect(promiseSpy).toHaveBeenCalledTimes(1)
    })

    it('should format url and call deleteObject', async () => {
      await sut.delete({ fileName: 'https://any_bucket.s3.amazonaws.com/any_picture.png' })

      expect(deleteObjectSpy).toHaveBeenCalledWith({ Bucket: bucket, Key: 'any_picture.png' })
      expect(deleteObjectSpy).toHaveBeenCalledTimes(1)
      expect(promiseSpy).toHaveBeenCalledTimes(1)
    })

    it('should return undefined on success', async () => {
      const result = await sut.delete({ fileName })

      expect(result).toBeUndefined()
    })
  })
})
