export interface LoadEpisode {
  load: (input: LoadEpisode.Input) => Promise<LoadEpisode.Output>
}

export namespace LoadEpisode {
  export type Input = { order: string, animeId: string }
  export type Output = string | undefined
}
