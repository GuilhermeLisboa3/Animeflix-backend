import { EpisodeInstance } from "../models/Episodes";
import { User, UserCreationAttibutes } from "./../models/User";

function filterLastEpisodesByAnime(episodes: EpisodeInstance[]) {
  const animesOnList: number[] = [];
  const lastEpisodes = episodes.reduce((currentList, episode) => {
    if (!animesOnList.includes(episode.animeId)) {
      animesOnList.push(episode.animeId);
      currentList.push(episode);
      return currentList;
    }

    const episodeFromSameAnime = currentList.find(
      (ep) => ep.animeId === episode.animeId
    );

    if (episodeFromSameAnime!.order > episode.order) {
      return currentList;
    }

    const listWithoutEpisodeFromSameAnime = currentList.filter(
      (ep) => ep.animeId !== episode.animeId
    );

    listWithoutEpisodeFromSameAnime.push(episode);

    return listWithoutEpisodeFromSameAnime;
  }, [] as EpisodeInstance[]);

  return lastEpisodes;
}

export const userService = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  },

  create: async (attributes: UserCreationAttibutes) => {
    const user = await User.create(attributes);
    return user;
  },

  update: async (
    id: number,
    attributes: {
      firstName: string;
      lastName: string;
      phone: string;
      birth: Date;
      email: string;
    }
  ) => {
    const [affectedRows, updatedUsers] = await User.update(attributes, {
      where: {
        id,
      },
      returning: true,
    });
    return updatedUsers[0]
  },

  getKeepWatchingList: async (id: number) => {
    const userWithWatchingEpisodes = await User.findByPk(id, {
      include: {
        association: "Episodes",
        attributes: [
          "id",
          "name",
          "synopsis",
          "order",
          ["video_url", "videoUrl"],
          ["seconds_long", "secondsLong"],
          ["anime_id", "animeId"],
        ],
        include: [
          {
            association: "Anime",
            attributes: [
              "id",
              "name",
              "synopsis",
              ["thumbnail_url", "thumbnailUrl"],
            ],
            as: "anime",
          },
        ],
        through: {
          as: "watchTime",
          attributes: ["seconds", ["updated_at", "updatedAt"]],
        },
      },
    });
    if (!userWithWatchingEpisodes) throw new Error("Usuário não encontrado!");

    const keepWatchingList = filterLastEpisodesByAnime(
      userWithWatchingEpisodes.Episodes!
    );
    // @ts-ignore
    keepWatchingList.sort((a, b) => a.watchTime.updatedAt < b.watchTime.updatedAt ? 1 : -1);
    return keepWatchingList;
  },
};
