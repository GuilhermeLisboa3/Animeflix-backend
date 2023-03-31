export interface ListAllCategories {
  list: (input: ListAllCategories.Input) => Promise<ListAllCategories.Output>
}

export namespace ListAllCategories {
  export type Input = { page: number, perPage: number }
  export type Output = {
    categories: Array<{ id: string, name: string, position: number }> | []
    page: number
    perPage: number
    count: number
  }
}
