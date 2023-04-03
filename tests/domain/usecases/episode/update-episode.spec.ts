import { UpdateEpisodeUseCase, UpdateEpisode } from '@/domain/usecases/episode'
import { LoadEpisodeById } from '@/domain/contracts/database/episode'

import { MockProxy, mock } from 'jest-mock-extended'
import { NotFoundError } from '@/domain/errors'

describe('UpdateEpisodeUseCase', () => {
  let episodeRepository: MockProxy<LoadEpisodeById>
  let makeEpisode: { id: string, file?: { buffer: Buffer, mimeType: string }, animeId?: number, order?: number }
  let sut: UpdateEpisode

  beforeAll(() => {
    makeEpisode = { id: '1', file: { buffer: Buffer.from('any'), mimeType: 'image/mp4' }, animeId: 1, order: 1 }
    episodeRepository = mock()
    episodeRepository.loadById.mockResolvedValue({ videoUrl: 'any_value' })
  })

  beforeEach(() => {
    sut = UpdateEpisodeUseCase(episodeRepository)
  })

  it('should call LoadEpisodeById with correct input', async () => {
    await sut(makeEpisode)

    expect(episodeRepository.loadById).toHaveBeenCalledWith({ id: '1' })
    expect(episodeRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return NotFoundError if LoadEpisodeById returns undefined', async () => {
    episodeRepository.loadById.mockResolvedValueOnce(undefined)

    const promise = sut(makeEpisode)

    await expect(promise).rejects.toThrow(new NotFoundError('id'))
  })
})
