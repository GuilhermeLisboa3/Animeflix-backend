import { LoadAnimesByCategoryId } from '@/domain/contracts/database/anime'
import { LoadCategoryById } from '@/domain/contracts/database/category'
import { NotFoundError } from '@/domain/errors'

type Setup = (categoryRepository: LoadCategoryById, animeRepository: LoadAnimesByCategoryId) => GetCategory
type Input = { id: string }
type Output = { id: string, name: string, position: number, animes: Array<{ id: number, name: string, thumbnailUrl: string, synopsis: string }> | [] }
export type GetCategory = (input: Input) => Promise<Output>

export const GetCategoryUseCase: Setup = (categoryRepository, animeRepository) => async ({ id }) => {
  const category = await categoryRepository.loadById({ id })
  if (!category) throw new NotFoundError('categoryId')
  const animes = await animeRepository.loadByCategoryId({ categoryId: id })
  return { id: category.id, name: category.name, position: category.position, animes }
}
