export interface CreateFavorite {
  create: (input: CreateFavorite.Input) => Promise<void>
}

export namespace CreateFavorite {
  export type Input = { userId: number, animeId: number }
}
