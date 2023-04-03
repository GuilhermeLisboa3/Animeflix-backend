export interface UpdateEpisodeRepository {
  update: (input: UpdateEpisodeRepository.Input) => Promise<void>
}

export namespace UpdateEpisodeRepository {
  export type Input = { id: string, name?: string, animeId?: number, videoUrl?: string, synopsis?: string, secondsLong?: number, order?: number }
}
