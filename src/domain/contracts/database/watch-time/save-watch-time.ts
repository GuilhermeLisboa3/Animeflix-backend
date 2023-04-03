export interface SaveWatchTime {
  save: (input: SaveWatchTime.Input) => Promise<void>
}

export namespace SaveWatchTime {
  export type Input = { userId: number, episodeId: number, seconds: number }
}
