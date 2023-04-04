export interface ListFavoriteRepository {
  list: (input: ListFavoriteRepository.Input) => Promise<void>
}

export namespace ListFavoriteRepository {
  export type Input = { userId: number }
  export type Output = number[] | undefined
}
