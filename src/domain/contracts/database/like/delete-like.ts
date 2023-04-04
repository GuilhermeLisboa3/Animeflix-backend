export interface DeleteLikeRepository {
  delete: (input: DeleteLikeRepository.Input) => Promise<void>
}

export namespace DeleteLikeRepository {
  export type Input = { userId: number, animeId: number }
}
