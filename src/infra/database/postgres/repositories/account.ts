import { CheckAccountByEmail, CreateAccount, LoadAccountByEmail } from '@/domain/contracts/database/account'
import { Account } from '@/infra/database/postgres/entities'

export class AccountRepository implements CheckAccountByEmail, CreateAccount, LoadAccountByEmail {
  async checkByEmail (email: string): Promise<boolean> {
    const existAccount = await Account.findOne({ where: { email } })
    return existAccount !== null
  }

  async create (input: CreateAccount.Input): Promise<CreateAccount.Output> {
    const account = await Account.create({ ...input, role: 'user' })
    return account !== null
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmail.Output> {
    const account = await Account.findOne({ attributes: ['id', 'password'], where: { email } })
    return account !== null ? { id: account.id.toString(), password: account.password } : undefined
  }
}
