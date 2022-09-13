import { Anime } from "../models";

export const animesServices = {
  findByWithEpisodes: async (id: string) => {
    const animesWithEpisodes = await Anime.findByPk(id, {
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      include: {
        association: "episodes",
        attributes: [
          "id",
          "name",
          "synopsis",
          "order",
          ["video_url", "videoUrl"],
          ["seconds_long", "secondsLong"],
        ],
        order: [["order", "ASC"]],
        separate: true,
      },
    });
    return animesWithEpisodes;
  },

  getRandomFeaturedAnimes: async () => {
    const featuredAnimes = await Anime.findAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      where: {
        featured: true,
      },
    });

    const randomFeaturedAnimes = featuredAnimes.sort(() => 0.5 - Math.random());

    return randomFeaturedAnimes.slice(0, 3);
  },

  getTopTenNewest: async () => {
    const animes = await Anime.findAll({
      limit: 10,
      order:[['created_at', 'DESC']]
    });

    return animes
  },
};
