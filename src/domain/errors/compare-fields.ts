export class CompareFieldsError extends Error {
  constructor (currentValue: string, newValue: string) {
    super(`the ${currentValue} and ${newValue} fields are different `)
    this.name = 'CompareFieldsError'
  }
}
