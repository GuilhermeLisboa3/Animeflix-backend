import { connect } from '@/infra/database/postgres/helpers'
import account from '@/infra/database/postgres/entities/account'
import category from '@/infra/database/postgres/entities/category'
import anime from '@/infra/database/postgres/entities/anime'
import episode from '@/infra/database/postgres/entities/episode'
import watchTime from '@/infra/database/postgres/entities/watch-time'
import favorite from '@/infra/database/postgres/entities/favorite'
import like from '@/infra/database/postgres/entities/like'

const sequelize = connect()

const Account = account(sequelize)
const Category = category(sequelize)
const Anime = anime(sequelize)
const Episode = episode(sequelize)
const WatchTime = watchTime(sequelize)
const Favorite = favorite(sequelize)
const Like = like(sequelize)

Category.hasMany(Anime, { as: 'animes' })

Anime.belongsTo(Category)
Anime.belongsToMany(Account, { through: Favorite })
Anime.belongsToMany(Account, { through: Like })
Anime.hasMany(Episode, { as: 'episodes' })
Anime.hasMany(Favorite, { as: 'FavoriteUsers', foreignKey: 'anime_id' })

Episode.belongsTo(Anime)
Episode.belongsToMany(Account, { through: WatchTime })

Favorite.belongsTo(Anime)
Favorite.belongsTo(Account)

Account.belongsToMany(Anime, { through: Favorite })
Account.belongsToMany(Anime, { through: Like })
Account.belongsToMany(Episode, { through: WatchTime })
Account.hasMany(Favorite, { as: 'FavoriteAnimes', foreignKey: 'user_id' })

export {
  sequelize,
  Account,
  Category,
  Anime,
  Episode,
  WatchTime,
  Favorite,
  Like
}
