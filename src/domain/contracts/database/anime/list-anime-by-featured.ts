export interface ListAnimeByFeatured {
  listByFeatured: () => Promise<ListAnimeByFeatured.Output>
}

export namespace ListAnimeByFeatured {
  export type Output = Array<{ id: number, name: string, thumbnailUrl: string, synopsis: string }>
}
