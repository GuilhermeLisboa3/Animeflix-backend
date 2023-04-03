export interface LoadEpisodeById {
  loadById: (input: LoadEpisodeById.Input) => Promise<LoadEpisodeById.Output>
}

export namespace LoadEpisodeById {
  export type Input = { id: string }
  export type Output = {
    videoUrl: string
  } | undefined
}
