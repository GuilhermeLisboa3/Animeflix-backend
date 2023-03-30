export interface LoadAccountByEmail {
  loadByEmail: (email: string) => Promise<LoadAccountByEmail.Output>
}

export namespace LoadAccountByEmail {
  export type Output = { id: string, password: string } | undefined
}
