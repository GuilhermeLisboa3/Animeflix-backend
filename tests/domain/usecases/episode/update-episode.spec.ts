import { UpdateEpisodeUseCase, UpdateEpisode } from '@/domain/usecases/episode'
import { LoadEpisodeById } from '@/domain/contracts/database/episode'

import { MockProxy, mock } from 'jest-mock-extended'

describe('UpdateEpisodeUseCase', () => {
  let episodeRepository: MockProxy<LoadEpisodeById>
  let makeEpisode: { id: string, file?: { buffer: Buffer, mimeType: string }, animeId?: number, order?: number }
  let sut: UpdateEpisode

  beforeAll(() => {
    makeEpisode = { id: '1', file: { buffer: Buffer.from('any'), mimeType: 'image/mp4' }, animeId: 1, order: 1 }
    episodeRepository = mock()
  })

  beforeEach(() => {
    sut = UpdateEpisodeUseCase(episodeRepository)
  })

  it('should call LoadEpisodeById with correct input', async () => {
    await sut(makeEpisode)

    expect(episodeRepository.loadById).toHaveBeenCalledWith({ id: '1' })
    expect(episodeRepository.loadById).toHaveBeenCalledTimes(1)
  })
})
