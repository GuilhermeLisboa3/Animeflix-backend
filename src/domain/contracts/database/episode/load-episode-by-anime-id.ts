export interface LoadEpisodeByAnimeId {
  loadByAnimeId: (input: LoadEpisodeByAnimeId.Input) => Promise<LoadEpisodeByAnimeId.Output>
}

export namespace LoadEpisodeByAnimeId {
  export type Input = { animeId: string }
  export type Output = Array<{ id: number, name: string, videoUrl: string, synopsis: string, secondsLong: number, order: number }>
}
