export interface LoadWatchTime {
  load: (input: LoadWatchTime.Input) => Promise<LoadWatchTime.Output>
}

export namespace LoadWatchTime {
  export type Input = { userId: string, episodeId: string }
  export type Output = { seconds: number, userId: number, episodeId: number, updatedAt?: string }
}
