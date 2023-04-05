import { CreateLike, DeleteLikeRepository, CheckLike } from '@/domain/contracts/database/like'
import { Like } from '@/infra/database/postgres/entities'

export class LikeRepository implements CreateLike, DeleteLikeRepository, CheckLike {
  async create ({ animeId, userId }: CreateLike.Input): Promise<void> {
    await Like.create({ animeId, userId })
  }

  async delete ({ animeId, userId }: DeleteLikeRepository.Input): Promise<void> {
    await Like.destroy({ where: { animeId, userId } })
  }

  async check ({ animeId, userId }: CheckLike.Input): Promise<CheckLike.Output> {
    const like = await Like.findOne({ where: { userId, animeId } })
    return like !== null
  }
}
