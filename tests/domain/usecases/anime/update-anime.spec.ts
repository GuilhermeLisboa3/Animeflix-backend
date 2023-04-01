import { UpdateAnimeUseCase, UpdateAnime } from '@/domain/usecases/anime'
import { LoadAnimeById } from '@/domain/contracts/database/anime'

import { MockProxy, mock } from 'jest-mock-extended'

describe('UpdateAnimeUseCase', () => {
  let animeRepository: MockProxy<LoadAnimeById>
  let makeAnime: { id: string, file?: { buffer: Buffer, mimeType: string }, categoryId?: number }
  let sut: UpdateAnime

  beforeAll(() => {
    makeAnime = { id: '1', file: { buffer: Buffer.from('any'), mimeType: 'image/png' }, categoryId: 1 }
    animeRepository = mock()
  })

  beforeEach(() => {
    sut = UpdateAnimeUseCase(animeRepository)
  })

  it('should call LoadAnimeById with correct input', async () => {
    await sut(makeAnime)

    expect(animeRepository.loadById).toHaveBeenCalledWith({ id: '1' })
    expect(animeRepository.loadById).toHaveBeenCalledTimes(1)
  })
})
