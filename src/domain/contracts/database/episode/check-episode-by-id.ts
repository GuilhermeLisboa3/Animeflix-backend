export interface CheckEpisodeById {
  checkById: (input: CheckEpisodeById.Input) => Promise<CheckEpisodeById.Output>
}

export namespace CheckEpisodeById {
  export type Input = { id: string }
  export type Output = boolean
}
