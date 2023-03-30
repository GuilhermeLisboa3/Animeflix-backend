export interface CreateAccount {
  create: (input: CreateAccount.Input) => Promise<CreateAccount.Output>
}

export namespace CreateAccount {
  export type Input = {
    firstName: string
    lastName: string
    phone: string
    birth: Date
    email: string
    password: string
  }
  export type Output = boolean
}
