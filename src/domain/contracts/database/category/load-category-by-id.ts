export interface LoadCategoryById {
  loadById: (input: LoadCategoryById.Input) => Promise<LoadCategoryById.Output>
}

export namespace LoadCategoryById {
  export type Input = { id: string }
  export type Output = { id: string, name: string, position: number } | undefined
}
