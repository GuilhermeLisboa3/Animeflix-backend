import { AddAnimeUseCase, AddAnime } from '@/domain/usecases/anime'
import { CheckAnime } from '@/domain/contracts/database/anime'
import { CheckCategoryById } from '@/domain/contracts/database/category'

import { mock, MockProxy } from 'jest-mock-extended'
import { FieldInUseError } from '@/domain/errors'

describe('AddAnime', () => {
  let animeRepository: MockProxy<CheckAnime>
  let categoryRepository: MockProxy<CheckCategoryById>
  let anime: { name: string, categoryId: number, file: { buffer: Buffer, mimeType: string }, synopsis: string, featured?: boolean }
  let sut: AddAnime

  beforeAll(() => {
    animeRepository = mock()
    animeRepository.check.mockResolvedValue(false)
    categoryRepository = mock()
    anime = { name: 'Any_name', categoryId: 1, file: { buffer: Buffer.from('any'), mimeType: 'image/png' }, synopsis: 'any_synopsis' }
  })

  beforeEach(() => {
    sut = AddAnimeUseCase(animeRepository, categoryRepository)
  })

  it('should call CheckAnime with correct input', async () => {
    await sut(anime)

    expect(animeRepository.check).toHaveBeenCalledWith({ name: 'any_name' })
    expect(animeRepository.check).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldInUseError if CheckAnime return true', async () => {
    animeRepository.check.mockResolvedValueOnce(true)

    const promise = sut(anime)

    await expect(promise).rejects.toThrow(new FieldInUseError('name'))
  })

  it('should call CheckCategoryById with correct input', async () => {
    await sut(anime)

    expect(categoryRepository.checkById).toHaveBeenCalledWith({ id: 1 })
    expect(categoryRepository.checkById).toHaveBeenCalledTimes(1)
  })
})
