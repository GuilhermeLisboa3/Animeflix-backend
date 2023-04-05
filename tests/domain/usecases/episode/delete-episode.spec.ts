import { DeleteEpisodeUseCase, DeleteEpisode } from '@/domain/usecases/episode'
import { LoadEpisodeById, DeleteEpisodeById } from '@/domain/contracts/database/episode'

import { mock, MockProxy } from 'jest-mock-extended'
import { NotFoundError } from '@/domain/errors'
import { DeleteFile } from '@/domain/contracts/gateways'

describe('DeleteEpisodeUseCase', () => {
  let episodeRepository: MockProxy<LoadEpisodeById & DeleteEpisodeById>
  let fileStorage: MockProxy<DeleteFile>
  let makeEpisode: { episodeId: string }
  let sut: DeleteEpisode

  beforeAll(() => {
    makeEpisode = { episodeId: '1' }
    episodeRepository = mock()
    episodeRepository.loadById.mockResolvedValue({ name: 'any_name', animeId: 1, synopsis: 'any_synopsis', order: 1, videoUrl: 'any_value', id: 1, secondsLong: 100 })
    fileStorage = mock()
  })

  beforeEach(() => {
    sut = DeleteEpisodeUseCase(episodeRepository, fileStorage)
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

  it('should rethrow if LoadEpisodeById throw', async () => {
    const error = new Error('infa_error')
    episodeRepository.loadById.mockRejectedValueOnce(error)

    const promise = sut(makeEpisode)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call DeleteFile with correct input', async () => {
    await sut(makeEpisode)

    expect(fileStorage.delete).toHaveBeenCalledWith({ fileName: 'any_value' })
    expect(fileStorage.delete).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if DeleteFile throw', async () => {
    const error = new Error('infa_error')
    fileStorage.delete.mockRejectedValueOnce(error)

    const promise = sut(makeEpisode)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call DeleteEpisodeById with correct input', async () => {
    await sut(makeEpisode)

    expect(episodeRepository.deleteById).toHaveBeenCalledWith({ id: '1' })
    expect(episodeRepository.deleteById).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if DeleteEpisodeById throw', async () => {
    const error = new Error('infa_error')
    episodeRepository.deleteById.mockRejectedValueOnce(error)

    const promise = sut(makeEpisode)

    await expect(promise).rejects.toThrow(error)
  })

  it('should return undefined on success', async () => {
    const result = await sut(makeEpisode)

    expect(result).toBeUndefined()
  })
})
