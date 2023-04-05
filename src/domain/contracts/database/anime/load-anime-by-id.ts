export interface LoadAnimeById {
  loadById: (input: LoadAnimeById.Input) => Promise<LoadAnimeById.Output>
}

export namespace LoadAnimeById {
  export type Input = { id: string }
  export type Output = { id: number, name: string, thumbnailUrl: string, synopsis: string, featured: boolean } | undefined
}
