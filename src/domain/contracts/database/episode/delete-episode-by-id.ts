export interface DeleteEpisodeById {
  deleteById: (input: DeleteEpisodeById.Input) => Promise<void>
}

export namespace DeleteEpisodeById {
  export type Input = { id: string }
}
