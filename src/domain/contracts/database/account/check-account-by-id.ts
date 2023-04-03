export interface CheckAccountById {
  checkById: (input: CheckAccountById.Input) => Promise<CheckAccountById.Output>
}

export namespace CheckAccountById {
  export type Input = { id: number }
  export type Output = boolean
}
