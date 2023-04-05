export interface LoadEpisodeById {
  loadById: (input: LoadEpisodeById.Input) => Promise<LoadEpisodeById.Output>
}

export namespace LoadEpisodeById {
  export type Input = { id: string }
  export type Output = {
    id: number
    name: string
    videoUrl: string | null
    synopsis: string
    secondsLong: number | null
    order: number
    animeId: number
    createdA?: string
    updatedAt?: string
  } | undefined
}
