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
    return []
  }, [] as Episodes[])

  return lastEpisodes
}
