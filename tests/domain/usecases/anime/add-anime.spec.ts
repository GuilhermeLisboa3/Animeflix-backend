import { AddAnimeUseCase, AddAnime } from '@/domain/usecases/anime'
import { CheckAnime } from '@/domain/contracts/database/anime'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddAnime', () => {
  let animeRepository: MockProxy<CheckAnime>
  let anime: { name: string, categoryId: number, file: { buffer: Buffer, mimeType: string }, synopsis: string, featured?: boolean }
  let sut: AddAnime

  beforeAll(() => {
    animeRepository = mock()
    anime = { name: 'Any_name', categoryId: 1, file: { buffer: Buffer.from('any'), mimeType: 'image/png' }, synopsis: 'any_synopsis' }
  })

  beforeEach(() => {
    sut = AddAnimeUseCase(animeRepository)
  })

  it('should call CheckAnime with correct input', async () => {
    await sut(anime)

    expect(animeRepository.check).toHaveBeenCalledWith({ name: 'any_name' })
    expect(animeRepository.check).toHaveBeenCalledTimes(1)
  })
})
