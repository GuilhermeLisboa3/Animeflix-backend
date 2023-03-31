export interface UpdateAccountById {
  update: (input: UpdateAccountById.Input) => Promise<void>
}

export namespace UpdateAccountById {
  export type Input = {
    id: string
    firstName?: string
    lastName?: string
    phone?: string
    birth?: Date
    email?: string
    password?: string
  }
}
