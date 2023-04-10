import { CheckEpisodeByOrder, CheckEpisodeById, CreateEpisode, DeleteEpisodeById, LoadEpisode, LoadEpisodeById, UpdateEpisodeRepository, LoadEpisodeByAnimeId } from '@/domain/contracts/database/episode'
import { Episode } from '@/infra/database/postgres/entities'

export class EpisodeRepository implements CheckEpisodeByOrder, CreateEpisode, LoadEpisodeById, UpdateEpisodeRepository, DeleteEpisodeById, LoadEpisode, LoadEpisodeByAnimeId, CheckEpisodeById {
  async checkByOrder ({ order, animeId }: CheckEpisodeByOrder.Input): Promise<CheckEpisodeByOrder.Output> {
    const existEpisode = await Episode.findOne({ where: { order, animeId } })
    return existEpisode !== null
  }

  async create ({ name, animeId, order, synopsis, secondsLong, videoUrl }: CreateEpisode.Input): Promise<CreateEpisode.Output> {
    const episode = await Episode.create({ name, animeId, order, synopsis, secondsLong, videoUrl })
    return episode !== null
  }

  async loadById ({ id }: LoadEpisodeById.Input): Promise<LoadEpisodeById.Output> {
    const episode = await Episode.findByPk(id, {
      attributes: [
        'id',
        'name',
        'videoUrl',
        'synopsis',
        'secondsLong',
        'order',
        ['video_url', 'videoUrl'],
        ['anime_id', 'animeId'],
        ['created_at', 'createdAt'],
        ['updated_at', 'updatedAt']]
    })
    return episode !== null ? episode.dataValues : undefined
  }

  async update ({ id, animeId, name, order, secondsLong, synopsis, videoUrl }: UpdateEpisodeRepository.Input): Promise<void> {
    const attributes = { animeId, name, order, secondsLong, synopsis, videoUrl }
    await Episode.update(attributes, { where: { id } })
  }

  async deleteById ({ id }: DeleteEpisodeById.Input): Promise<void> {
    await Episode.destroy({ where: { id } })
  }

  async load ({ animeId, order }: LoadEpisode.Input): Promise<LoadEpisode.Output> {
    const episode = await Episode.findOne({ where: { order, animeId } })
    if (episode) {
      return episode.videoUrl !== null ? episode.videoUrl : undefined
    }
  }

  async loadByAnimeId ({ animeId }: LoadEpisodeByAnimeId.Input): Promise<LoadEpisodeByAnimeId.Output> {
    const episode = await Episode.findAll({ attributes: ['id', 'name', 'videoUrl', 'synopsis', 'secondsLong', 'order', ['video_url', 'videoUrl']], where: { animeId } })
    return episode
  }

  async checkById ({ id }: CheckEpisodeById.Input): Promise<CheckEpisodeById.Output> {
    const existEpisode = await Episode.findOne({ where: { id } })
    return existEpisode !== null
  }
}
