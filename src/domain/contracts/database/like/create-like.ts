export interface CreateLike {
  create: (input: CreateLike.Input) => Promise<void>
}

export namespace CreateLike {
  export type Input = { userId: number, animeId: number }
}
