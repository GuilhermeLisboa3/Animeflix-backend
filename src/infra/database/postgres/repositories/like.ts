import { CreateLike, DeleteLikeRepository } from '@/domain/contracts/database/like'
import { Like } from '@/infra/database/postgres/entities'

export class LikeRepository implements CreateLike, DeleteLikeRepository {
  async create ({ animeId, userId }: CreateLike.Input): Promise<void> {
    await Like.create({ animeId, userId })
  }

  async delete ({ animeId, userId }: DeleteLikeRepository.Input): Promise<void> {
    await Like.destroy({ where: { animeId, userId } })
  }
}
