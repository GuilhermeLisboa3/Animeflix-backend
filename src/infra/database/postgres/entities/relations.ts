import { connect } from '@/infra/database/postgres/helpers'
import account from '@/infra/database/postgres/entities/account'

const sequelize = connect()

const Account = account(sequelize)

export {
  sequelize,
  Account
}
