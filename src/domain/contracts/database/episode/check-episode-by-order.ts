export interface CheckEpisodeByOrder {
  checkByOrder: (input: CheckEpisodeByOrder.Input) => Promise<CheckEpisodeByOrder.Output>
}

export namespace CheckEpisodeByOrder {
  export type Input = { order: number }
  export type Output = boolean
}
