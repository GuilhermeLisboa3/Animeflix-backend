export interface CreateAnime {
  create: (input: CreateAnime.Input) => Promise<CreateAnime.Output>
}

export namespace CreateAnime {
  export type Input = {name: string, categoryId: number, thumbnailUrl?: string, synopsis: string, featured?: boolean }
  export type Output = boolean
}
