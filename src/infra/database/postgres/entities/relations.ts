import { connect } from '@/infra/database/postgres/helpers'
import account from '@/infra/database/postgres/entities/account'
import category from '@/infra/database/postgres/entities/category'
import anime from '@/infra/database/postgres/entities/anime'

const sequelize = connect()

const Account = account(sequelize)
const Category = category(sequelize)
const Anime = anime(sequelize)

Category.hasMany(Anime, { as: 'animes' })

Anime.belongsTo(Category)

export {
  sequelize,
  Account,
  Category,
  Anime
}
