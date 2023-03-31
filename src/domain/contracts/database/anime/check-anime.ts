export interface CheckAnime {
  check: (input: CheckAnime.Input) => Promise<CheckAnime.Output>
}

export namespace CheckAnime {
  export type Input = { name: string }
  export type Output = boolean
}
