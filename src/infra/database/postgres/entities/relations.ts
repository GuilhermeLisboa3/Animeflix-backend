import { connect } from '@/infra/database/postgres/helpers'
import account from '@/infra/database/postgres/entities/account'
import category from '@/infra/database/postgres/entities/category'

const sequelize = connect()

const Account = account(sequelize)
const Category = category(sequelize)

export {
  sequelize,
  Account,
  Category
}
