import { CheckAnime } from '@/domain/contracts/database/anime'

type Setup = (animeRepository: CheckAnime) => AddAnime
type Input = { name: string, categoryId: number, file?: { buffer: Buffer, mimeType: string }, synopsis: string, featured?: boolean }
export type AddAnime = (input: Input) => Promise<void>

export const AddAnimeUseCase: Setup = (animeRepository) => async ({ name, categoryId, file, synopsis, featured }) => {
  const nameLowerCase = name.toLocaleLowerCase()
  await animeRepository.check({ name: nameLowerCase })
}
