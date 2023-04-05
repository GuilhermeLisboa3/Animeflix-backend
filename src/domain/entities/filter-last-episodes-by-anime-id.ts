type Episodes = {
  id: number
  name: string
  synopsis: string
  order: number
  videoUrl: string | null
  secondsLong: number | null
  animeId: number
  createdAt: string
  updatedAt: string
}

export function filterLastEpisodesByAnime (episodes: Episodes[]) {
  const animesOnList: number[] = []
  const lastEpisodes = episodes.reduce((currentList, episode) => {
    if (!animesOnList.includes(episode.animeId)) {
      animesOnList.push(episode.animeId)
      currentList.push(episode)
      return currentList
    }
    const episodeFromSameAnime = currentList.find(
      (ep) => ep.animeId === episode.animeId
    )

    if (episodeFromSameAnime && episodeFromSameAnime.order > episode.order) {
      return currentList
    }

    const listWithoutEpisodeFromSameAnime = currentList.filter(
      (ep) => ep.animeId !== episode.animeId
    )

    listWithoutEpisodeFromSameAnime.push(episode)

    return listWithoutEpisodeFromSameAnime
  }, [] as Episodes[])

  return lastEpisodes
}
