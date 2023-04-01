export interface ListAnimeByName {
  listByName: (input: ListAnimeByName.Input) => Promise<ListAnimeByName.Output>
}

export namespace ListAnimeByName {
  export type Input = { page: number, perPage: number, name: string }
  export type Output = {
    animes: Array<{ id: number, name: string, thumbnailUrl: string, synopsis: string }>
    page: number
    perPage: number
    count: number
  }
}
