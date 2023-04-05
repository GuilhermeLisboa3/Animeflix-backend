export interface CheckLike {
  check: (input: CheckLike.Input) => Promise<CheckLike.Output>
}

export namespace CheckLike {
  export type Input = { userId: number, animeId: number }
  export type Output = boolean
}
