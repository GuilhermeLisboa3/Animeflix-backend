import { CheckAnime, CreateAnime, DeleteAnimeById, ListAnimeByFeatured, ListAnimeByName, ListAnimeNewest, LoadAnimeById, UpdateAnimeRepository, CheckAnimeById, LoadAnimesByCategoryId } from '@/domain/contracts/database/anime'
import { Anime } from '@/infra/database/postgres/entities'
import { Op, Sequelize } from 'sequelize'

export class AnimeRepository implements CheckAnime, CreateAnime, LoadAnimeById, DeleteAnimeById, UpdateAnimeRepository, ListAnimeByName, ListAnimeByFeatured, ListAnimeNewest, CheckAnimeById, LoadAnimesByCategoryId {
  async check ({ name }: CheckAnime.Input): Promise<CheckAnime.Output> {
    const existAnime = await Anime.findOne({ where: { name } })
    return existAnime !== null
  }

  async create ({ name, categoryId, synopsis, featured, thumbnailUrl }: CreateAnime.Input): Promise<CreateAnime.Output> {
    const anime = await Anime.create({ name, categoryId, synopsis, featured, thumbnailUrl })
    return anime !== null
  }

  async loadById ({ id }: LoadAnimeById.Input): Promise<LoadAnimeById.Output> {
    const anime = await Anime.findByPk(id, { attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl'], 'featured'] })
    return anime !== null ? anime : undefined
  }

  async deleteById ({ id }: DeleteAnimeById.Input): Promise<void> {
    await Anime.destroy({ where: { id } })
  }

  async update ({ id, categoryId, featured, name, synopsis, thumbnailUrl }: UpdateAnimeRepository.Input): Promise<void> {
    const attributes = { categoryId, featured, name, synopsis, thumbnailUrl }
    await Anime.update(attributes, { where: { id } })
  }

  async listByName ({ name, page, perPage }: ListAnimeByName.Input): Promise<ListAnimeByName.Output> {
    const offset = (page - 1) * perPage
    const { count, rows } = await Anime.findAndCountAll({
      attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
      where: { name: { [Op.iLike]: `%${name}%` } },
      limit: perPage,
      offset
    })
    return { animes: rows, page, perPage, count }
  }

  async listByFeatured (): Promise<ListAnimeByFeatured.Output> {
    const listAnime = await Anime.findAll({
      order: Sequelize.literal('random()'),
      attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
      where: {
        featured: true
      },
      limit: 5
    })
    return listAnime.slice(0, 3)
  }

  async listNewest (): Promise<ListAnimeNewest.Output> {
    const listAnime = await Anime.findAll({
      limit: 10,
      order: [['created_at', 'DESC']]
    })
    return listAnime
  }

  async checkById ({ id }: CheckAnimeById.Input): Promise<CheckAnimeById.Output> {
    const existAnime = await Anime.findOne({ where: { id } })
    return existAnime !== null
  }

  async loadByCategoryId ({ categoryId }: LoadAnimesByCategoryId.Input): Promise<LoadAnimesByCategoryId.Output> {
    const listAnime = await Anime.findAll({ attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']], where: { categoryId } })
    return listAnime
  }

  async getTopTenByLikes () {
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
    )
    if (result) { return result[0] } else { return null }
  }
}
