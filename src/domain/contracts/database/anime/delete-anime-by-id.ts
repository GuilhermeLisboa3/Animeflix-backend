export interface DeleteAnimeById {
  deleteById: (input: DeleteAnimeById.Input) => Promise<void>
}

export namespace DeleteAnimeById {
  export type Input = { id: string }
}
