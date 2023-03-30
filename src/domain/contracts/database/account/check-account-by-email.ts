export interface CheckAccountByEmail {
  checkByEmail: (email: string) => Promise<CheckAccountByEmail.Output>
}

export namespace CheckAccountByEmail {
  export type Output = boolean
}
