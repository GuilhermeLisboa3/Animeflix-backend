export interface LoadWatchTimeByUserId {
  loadByUserId: (input: LoadWatchTimeByUserId.Input) => Promise<LoadWatchTimeByUserId.Output>
}

export namespace LoadWatchTimeByUserId {
  export type Input = { userId: string }
  export type Output = number[] | []
}
