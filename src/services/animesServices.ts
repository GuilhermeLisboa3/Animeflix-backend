import { Op } from "sequelize";
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
      order: [["created_at", "DESC"]],
    });

    return animes;
  },

  findByName: async (name: string, page: number, perPage: number) => {
    const offset = (page - 1) * perPage;
    const { count, rows } = await Anime.findAndCountAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: perPage,
      offset,
    });

    return {
      animes: rows,
      page,
      perPage,
      total: count,
    };
  },

  getTopTenByLikes: async () => {
    const result = await Anime.sequelize?.query(
      `SELECT 
          animes.id,
          animes.name,
          animes.synopsis,
          animes.thumbnail_url AS thumbnailUrl,
          COUNT(users.id) AS likes
      FROM animes
          LEFT OUTER JOIN likes
            ON animes.id = likes.anime_id
              INNER JOIN users
                  ON users.id = likes.user_id
      GROUP BY animes.id
      ORDER BY likes DESC
      LIMIT 10;
      `
    );

    if (result) {
      const [topTen, metada] = result;
      return topTen
    }else{
      return null
    }
  },
};
