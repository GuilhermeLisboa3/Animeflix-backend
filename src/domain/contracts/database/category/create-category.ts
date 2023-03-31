export interface CreateCategory {
  create: (input: CreateCategory.Input) => Promise<CreateCategory.Output>
}

export namespace CreateCategory {
  export type Input = {
    name: string
    position: number
  }
  export type Output = boolean
}
