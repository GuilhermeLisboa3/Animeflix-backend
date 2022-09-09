import { Anime } from './Anime';
import { Category } from "./Category";

Category.hasMany(Anime)
Anime.belongsTo(Category)

export{
    Category,
    Anime
}