export interface LoadAnimesByCategoryId {
  loadByCategoryId: (input: LoadAnimesByCategoryId.Input) => Promise<LoadAnimesByCategoryId.Output>
}

export namespace LoadAnimesByCategoryId {
  export type Input = { categoryId: string }
  export type Output = Array<{ id: number, name: string, thumbnailUrl: string, synopsis: string }> | []
}
