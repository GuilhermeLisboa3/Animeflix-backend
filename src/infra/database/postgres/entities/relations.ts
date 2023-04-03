import { connect } from '@/infra/database/postgres/helpers'
import account from '@/infra/database/postgres/entities/account'
import category from '@/infra/database/postgres/entities/category'
import anime from '@/infra/database/postgres/entities/anime'
import episode from '@/infra/database/postgres/entities/episode'
import watchTime from '@/infra/database/postgres/entities/watch-time'

const sequelize = connect()

const Account = account(sequelize)
const Category = category(sequelize)
const Anime = anime(sequelize)
const Episode = episode(sequelize)
const WatchTime = watchTime(sequelize)

Category.hasMany(Anime, { as: 'animes' })

Anime.belongsTo(Category)
Anime.hasMany(Episode, { as: 'episodes' })

Episode.belongsTo(Anime)
Episode.belongsToMany(Account, { through: WatchTime })

Account.belongsToMany(Episode, { through: WatchTime })

export {
  sequelize,
  Account,
  Category,
  Anime,
  Episode,
  WatchTime
}
