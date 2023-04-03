import { connect } from '@/infra/database/postgres/helpers'
import account from '@/infra/database/postgres/entities/account'
import category from '@/infra/database/postgres/entities/category'
import anime from '@/infra/database/postgres/entities/anime'
import episode from '@/infra/database/postgres/entities/episode'

const sequelize = connect()

const Account = account(sequelize)
const Category = category(sequelize)
const Anime = anime(sequelize)
const Episode = episode(sequelize)

Category.hasMany(Anime, { as: 'animes' })

Anime.belongsTo(Category)
Anime.hasMany(Episode, { as: 'episodes' })

Episode.belongsTo(Anime)

export {
  sequelize,
  Account,
  Category,
  Anime,
  Episode
}
