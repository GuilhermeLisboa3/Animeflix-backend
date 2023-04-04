import { LikeRepository } from '@/infra/database/postgres/repositories'

export const makeLikeRepository = (): LikeRepository => {
  return new LikeRepository()
}
