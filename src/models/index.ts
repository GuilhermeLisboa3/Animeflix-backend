import { Favorite } from "./Favorite";
import { User } from "./User";
import { Anime } from "./Anime";
import { Category } from "./Category";
import { Episode } from "./Episodes";
import { Like } from "./Like";

Category.hasMany(Anime, { as: "animes" });

Anime.belongsTo(Category);
Anime.belongsToMany(User, { through: Favorite });
Anime.belongsToMany(User, { through: Like})
Anime.hasMany(Episode, { as: "episodes" });
Anime.hasMany(Favorite, { as: "FavoriteUsers", foreignKey: "anime_id" });

Episode.belongsTo(Anime);

Favorite.belongsTo(Anime);
Favorite.belongsTo(User); 

User.belongsToMany(Anime, { through: Favorite });
User.belongsToMany(Anime, { through: Like });
User.hasMany(Favorite, { as: "FavoriteAnimes", foreignKey: "user_id" });

export { Category, Anime, Episode, User, Favorite, Like };
