export interface CreateEpisode {
  create: (input: CreateEpisode.Input) => Promise<CreateEpisode.Output>
}

export namespace CreateEpisode {
  export type Input = { name: string, animeId: number, videoUrl?: string, synopsis: string, secondsLong?: number, order: number }
  export type Output = boolean
}
