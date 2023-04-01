export default {
  s3: {
    accessKey: process.env.AWS_S3_ACCESS_KEY ?? '',
    secret: process.env.AWS_S3_SECRET ?? '',
    bucket: process.env.AWS_S3_BUCKET ?? ''
  },
  port: process.env.PORT ?? 3000,
  secret: process.env.SECRET ?? 'jkAOUHFIUasubr213oiugrbjkasdkJASJHD1IU23GR8O1827GD'
}
