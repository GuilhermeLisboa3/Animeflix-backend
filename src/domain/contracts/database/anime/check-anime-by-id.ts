export interface CheckAnimeById {
  checkById: (input: CheckAnimeById.Input) => Promise<CheckAnimeById.Output>
}

export namespace CheckAnimeById {
  export type Input = { id: number }
  export type Output = boolean
}
