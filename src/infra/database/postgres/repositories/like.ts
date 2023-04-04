import { CreateLike } from '@/domain/contracts/database/like'
import { Like } from '@/infra/database/postgres/entities'

export class LikeRepository implements CreateLike {
  async create ({ animeId, userId }: CreateLike.Input): Promise<void> {
    await Like.create({ animeId, userId })
  }
}
