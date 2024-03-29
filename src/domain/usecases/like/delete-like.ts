import { CheckAccountById } from '@/domain/contracts/database/account'
import { CheckAnimeById } from '@/domain/contracts/database/anime'
import { DeleteLikeRepository } from '@/domain/contracts/database/like'
import { NotFoundError } from '@/domain/errors'

type Setup = (accountRepository: CheckAccountById, animeRepository: CheckAnimeById, likeRepository: DeleteLikeRepository) => DeleteLike
type Input = { accountId: string, animeId: string }
export type DeleteLike = (input: Input) => Promise<void>

export const DeleteLikeUseCase: Setup = (accountRepository, animeRepository, likeRepository) => async ({ accountId, animeId }) => {
  const accountIdNumber = Number(accountId)
  const animeIdNumber = Number(animeId)
  const existAccount = await accountRepository.checkById({ id: accountIdNumber })
  if (!existAccount) throw new NotFoundError('accountId')
  const existAnime = await animeRepository.checkById({ id: animeIdNumber })
  if (!existAnime) throw new NotFoundError('animeId')
  await likeRepository.delete({ userId: accountIdNumber, animeId: animeIdNumber })
}
