import { User } from './User';
import { Anime } from './Anime';
import { Category } from './Category'
import { Episode } from './Episodes'

Category.hasMany(Anime)

Anime.belongsTo(Category)
Anime.hasMany(Episode)

Episode.belongsTo(Anime)

export {
  Category,
  Anime,
  Episode,
  User
}