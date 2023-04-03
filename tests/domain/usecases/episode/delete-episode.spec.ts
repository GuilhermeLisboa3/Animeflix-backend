import { DeleteEpisodeUseCase, DeleteEpisode } from '@/domain/usecases/episode'
import { LoadEpisodeById } from '@/domain/contracts/database/episode'

import { mock, MockProxy } from 'jest-mock-extended'
import { NotFoundError } from '@/domain/errors'

describe('DeleteEpisodeUseCase', () => {
  let episodeRepository: MockProxy<LoadEpisodeById>
  let makeEpisode: { episodeId: string }
  let sut: DeleteEpisode

  beforeAll(() => {
    makeEpisode = { episodeId: '1' }
    episodeRepository = mock()
    episodeRepository.loadById.mockResolvedValue({ videoUrl: 'any_value' })
  })

  beforeEach(() => {
    sut = DeleteEpisodeUseCase(episodeRepository)
  })

  it('should call LoadEpisodeById with correct input', async () => {
    await sut(makeEpisode)

    expect(episodeRepository.loadById).toHaveBeenCalledWith({ id: '1' })
    expect(episodeRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return NotFoundError if LoadEpisodeById returns undefined', async () => {
    episodeRepository.loadById.mockResolvedValueOnce(undefined)

    const promise = sut(makeEpisode)

    await expect(promise).rejects.toThrow(new NotFoundError('episodeId'))
  })
})
