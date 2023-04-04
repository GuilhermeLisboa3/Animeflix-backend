import { CheckAccountById } from '@/domain/contracts/database/account'
import { CheckAnimeById } from '@/domain/contracts/database/anime'
import { CreateLike } from '@/domain/contracts/database/like'
import { NotFoundError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountById, animeRepository: CheckAnimeById, likeRepository: CreateLike) => AddLike
type Input = { accountId: string, animeId: number}
export type AddLike = (input: Input) => Promise<void>

export const AddLikeUseCase: Setup = (accountRepository, animeRepository, likeRepository) => async ({ accountId, animeId }) => {
  const existAccount = await accountRepository.checkById({ id: Number(accountId) })
  if (!existAccount) throw new NotFoundError('accountId')
  const existAnime = await animeRepository.checkById({ id: animeId })
  if (!existAnime) throw new NotFoundError('animeId')
  await likeRepository.create({ userId: Number(accountId), animeId })
}
