import { Favorite } from './../models/Favorite';
export const favoriteService = {
    create: async (userId:  number, animeId: number)=>{
        const favorite = await Favorite.create({
            animeId,
            userId
        })

        return favorite;
    }
}