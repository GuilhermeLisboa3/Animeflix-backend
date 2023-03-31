export interface LoadAccountById {
  loadById: (input: LoadAccountById.Input) => Promise<LoadAccountById.Output>
}

export namespace LoadAccountById {
  export type Input = { id: string }
  export type Output = {
    firstName: string
    lastName: string
    phone: string
    birth: Date
    email: string
    password: string
    role: string
    createdAt?: Date
    updatedAt?: Date
  } | undefined
}
