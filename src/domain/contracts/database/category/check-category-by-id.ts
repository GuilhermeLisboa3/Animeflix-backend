export interface CheckCategoryById {
  checkById: (input: CheckCategoryById.Input) => Promise<CheckCategoryById.Output>
}

export namespace CheckCategoryById {
  export type Input = { id: number }
  export type Output = boolean
}
