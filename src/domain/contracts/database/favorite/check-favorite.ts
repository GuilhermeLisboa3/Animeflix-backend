export interface CheckFavorite {
  check: (input: CheckFavorite.Input) => Promise<CheckFavorite.Output>
}

export namespace CheckFavorite {
  export type Input = { userId: string, animeId: string }
  export type Output = boolean
}
