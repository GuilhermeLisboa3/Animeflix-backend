export interface DeleteCategoryById {
  delete: (input: DeleteCategoryById.Input) => Promise<void>
}

export namespace DeleteCategoryById {
  export type Input = { id: string }
}
