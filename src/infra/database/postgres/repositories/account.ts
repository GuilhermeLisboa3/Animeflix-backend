import { CheckAccountByEmail, CheckAccountRole, CreateAccount, LoadAccountByEmail, LoadAccountById, UpdateAccountById } from '@/domain/contracts/database/account'
import { Account } from '@/infra/database/postgres/entities'
import { Op } from 'sequelize'

export class AccountRepository implements CheckAccountByEmail, CreateAccount, LoadAccountByEmail, CheckAccountRole, LoadAccountById, UpdateAccountById {
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

  async checkRole ({ accountId, role }: CheckAccountRole.Input): Promise<CheckAccountRole.Output> {
    const account = await Account.findOne({ where: { id: accountId, [Op.or]: [{ role: role ?? 'user' }, { role: 'admin' }] } })
    return account !== null
  }

  async loadById ({ id }: LoadAccountById.Input): Promise<LoadAccountById.Output> {
    const account = await Account.findOne({ where: { id } })
    if (account === null) return undefined
    return account
  }

  async update (input: UpdateAccountById.Input): Promise<void> {
    await Account.update(input, { where: { id: input.id } })
  }
}
