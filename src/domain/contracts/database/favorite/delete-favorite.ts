export interface DeleteFavoriteRepository {
  delete: (input: DeleteFavoriteRepository.Input) => Promise<void>
}

export namespace DeleteFavoriteRepository {
  export type Input = { userId: number, animeId: number }
}
