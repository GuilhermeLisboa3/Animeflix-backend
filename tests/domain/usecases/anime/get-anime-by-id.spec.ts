import { GetAnimeByIdUseCase, GetAnimeById } from '@/domain/usecases/anime'
import { LoadAnimeById } from '@/domain/contracts/database/anime'

import { MockProxy, mock } from 'jest-mock-extended'

describe('GetAnimeById', () => {
  let animeRepository: MockProxy<LoadAnimeById>
  let makeAnime: { id: string }
  let sut: GetAnimeById

  beforeAll(() => {
    makeAnime = { id: '1' }
    animeRepository = mock()
  })

  beforeEach(() => {
    sut = GetAnimeByIdUseCase(animeRepository)
  })

  it('should call LoadAnimeById with correct input', async () => {
    await sut(makeAnime)

    expect(animeRepository.loadById).toHaveBeenCalledWith(makeAnime)
    expect(animeRepository.loadById).toHaveBeenCalledTimes(1)
  })
})
