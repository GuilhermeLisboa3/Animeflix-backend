import { CheckAccountByEmail } from '@/domain/contracts/database/account'
import { Account } from '@/infra/database/postgres/entities'

export class AccountRepository implements CheckAccountByEmail {
  async checkByEmail (email: string): Promise<boolean> {
    const existAccount = await Account.findOne({ where: { email } })
    return existAccount !== null
  }
}
