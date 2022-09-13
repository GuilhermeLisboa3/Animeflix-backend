import { Anime } from "../models";

export const animesServices = {
  findByWithEpisodes: async (id: string) => {
    const animesWithEpisodes = await Anime.findByPk(id, {
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      include: {
        association: "Episodes",
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
};
