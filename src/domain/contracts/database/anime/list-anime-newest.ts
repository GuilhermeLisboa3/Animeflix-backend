export interface ListAnimeNewest {
  listNewest: () => Promise<ListAnimeNewest.Output>
}

export namespace ListAnimeNewest {
  export type Output = Array<{
    id: number
    name: string
    thumbnailUrl: string
    synopsis: string
    featured: boolean
    createdAt?: Date
    updatedAt?: Date
  }>
}
