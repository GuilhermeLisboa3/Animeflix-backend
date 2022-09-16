import { Favorite } from "./../models/Favorite";
export const favoriteService = {
  findByUserId: async (userId: number) => {
    const favorites = await Favorite.findAll({
      attributes: [["user_id", "userId"]],
      where: {
        userId,
      },
      include: {
        association: "Anime",
        attributes: [
          "id",
          "name",
          "synopsis",
          ["thumbnail_url", "thumbnailUrl"],
        ],
      },
    });
    return {
        userId,
        animes: favorites.map(favorite => favorite.Anime)
      }
  },

  create: async (userId: number, animeId: number) => {
    const favorite = await Favorite.create({
      animeId,
      userId,
    });

    return favorite;
  },

  delete: async (userId:number, animeId:number)=>{
    await Favorite.destroy({
      where:{
        userId,
        animeId
      }
    })
  },

  isFavorited: async (userId:number, animeId:number) =>{
    const favorite = await Favorite.findOne({
      where:{
        userId,
        animeId
      }
    })

    return favorite !== null ? true : false
  }
};
