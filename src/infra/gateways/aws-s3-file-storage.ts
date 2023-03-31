import { UploadFile } from '@/domain/contracts/gateways'

import { config, S3 } from 'aws-sdk'

export class AwsS3FileStorage {
  constructor (accessKeyId: string, secretAccessKey: string, private readonly bucket: string) {
    config.update({ credentials: { accessKeyId, secretAccessKey } })
  }

  async upload ({ file, fileName }: UploadFile.Input): Promise<void> {
    await new S3().upload({ Bucket: this.bucket, Body: file, Key: fileName, ACL: 'public-read' }).promise()
  }
}
