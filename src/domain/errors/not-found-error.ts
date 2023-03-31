export class NotFoundError extends Error {
  constructor (fieldName: string) {
    super(`${fieldName} not found`)
    this.name = 'NotFoundError'
  }
}
