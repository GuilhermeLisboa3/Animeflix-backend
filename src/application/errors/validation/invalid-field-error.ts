export class InvalidFieldError extends Error {
  constructor (fieldName: string) {
    super(`Invalid field: ${fieldName}`)
    this.name = 'InvalidFieldError'
  }
}
