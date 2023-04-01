export interface UpdateAnimeRepository {
  update: (input: UpdateAnimeRepository.Input) => Promise<void>
}

export namespace UpdateAnimeRepository {
  export type Input = { id: string, name?: string, categoryId?: number, thumbnailUrl?: string, synopsis?: string, featured?: boolean }
}
