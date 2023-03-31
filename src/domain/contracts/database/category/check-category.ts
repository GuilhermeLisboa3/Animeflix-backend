export interface CheckCategory {
  check: (input: CheckCategory.Input) => Promise<CheckCategory.Output>
}

export namespace CheckCategory {
  export type Input = {
    name: string
    position: number
  }
  export type Output = boolean
}
