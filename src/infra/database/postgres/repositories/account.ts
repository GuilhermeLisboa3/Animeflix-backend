import { CheckAccountByEmail, CreateAccount } from '@/domain/contracts/database/account'
import { Account } from '@/infra/database/postgres/entities'

export class AccountRepository implements CheckAccountByEmail, CreateAccount {
  async checkByEmail (email: string): Promise<boolean> {
    const existAccount = await Account.findOne({ where: { email } })
    return existAccount !== null
  }

  async create (input: CreateAccount.Input): Promise<CreateAccount.Output> {
    const account = await Account.create({ ...input, role: 'user' })
    return account !== null
  }
}
