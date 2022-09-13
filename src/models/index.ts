import { User } from './User';
import { Anime } from './Anime';
import { Category } from './Category'
import { Episode } from './Episodes'

Category.hasMany(Anime, {as: 'animes'})

Anime.belongsTo(Category)
Anime.hasMany(Episode, {as: 'episodes'})

Episode.belongsTo(Anime)

export {
  Category,
  Anime,
  Episode,
  User
}