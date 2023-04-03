import { UpdateEpisodeUseCase, UpdateEpisode } from '@/domain/usecases/episode'
import { LoadEpisodeById, CheckEpisodeByOrder, UpdateEpisodeRepository } from '@/domain/contracts/database/episode'
import { FieldInUseError, NotFoundError } from '@/domain/errors'
import { DeleteFile, UUIDGenerator, UploadFile } from '@/domain/contracts/gateways'
import { CheckAnimeById } from '@/domain/contracts/database/anime'

import { MockProxy, mock } from 'jest-mock-extended'

describe('UpdateEpisodeUseCase', () => {
  let episodeRepository: MockProxy<LoadEpisodeById & CheckEpisodeByOrder & UpdateEpisodeRepository>
  let fileStorage: MockProxy<DeleteFile & UploadFile>
  let uuid: MockProxy<UUIDGenerator>
  let animeRepository: MockProxy<CheckAnimeById>
  let makeEpisode: { id: string, file?: { buffer: Buffer, mimeType: string }, animeId?: number, order?: number }
  let sut: UpdateEpisode

  beforeAll(() => {
    makeEpisode = { id: '1', file: { buffer: Buffer.from('any'), mimeType: 'image/mp4' }, animeId: 1, order: 1 }
    episodeRepository = mock()
    episodeRepository.loadById.mockResolvedValue({ videoUrl: 'any_value' })
    fileStorage = mock()
    fileStorage.upload.mockResolvedValue('any_url')
    uuid = mock()
    uuid.generate.mockReturnValue('any_key')
    animeRepository = mock()
    animeRepository.checkById.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = UpdateEpisodeUseCase(episodeRepository, fileStorage, uuid, animeRepository)
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

  it('should rethrow if LoadEpisodeById throw', async () => {
    const error = new Error('infa_error')
    episodeRepository.loadById.mockRejectedValueOnce(error)

    const promise = sut(makeEpisode)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call CheckEpisodeByOrder with correct input', async () => {
    await sut(makeEpisode)

    expect(episodeRepository.checkByOrder).toHaveBeenCalledWith({ order: 1 })
    expect(episodeRepository.checkByOrder).toHaveBeenCalledTimes(1)
  })

  it('should return FieldInUseError if CheckEpisodeByOrder returns true', async () => {
    episodeRepository.checkByOrder.mockResolvedValueOnce(true)

    const promise = sut(makeEpisode)

    await expect(promise).rejects.toThrow(new FieldInUseError('order'))
  })

  it('should rethrow if CheckEpisodeByOrder throw', async () => {
    const error = new Error('infa_error')
    episodeRepository.checkByOrder.mockRejectedValueOnce(error)

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

  it('should call UUIDGenerator with correct input', async () => {
    await sut(makeEpisode)

    expect(uuid.generate).toHaveBeenCalledWith()
    expect(uuid.generate).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if UUIDGenerator throw', async () => {
    const error = new Error('infa_error')
    uuid.generate.mockImplementationOnce(() => { throw error })

    const promise = sut(makeEpisode)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call UploadFile with correct input', async () => {
    await sut(makeEpisode)

    expect(fileStorage.upload).toHaveBeenCalledWith({ file: Buffer.from('any'), fileName: 'any_key.mp4' })
    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if UploadFile throw', async () => {
    const error = new Error('infa_error')
    fileStorage.upload.mockRejectedValueOnce(error)

    const promise = sut(makeEpisode)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call CheckAnimeById with correct input', async () => {
    await sut(makeEpisode)

    expect(animeRepository.checkById).toHaveBeenCalledWith({ id: 1 })
    expect(animeRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if CheckAnimeById throw', async () => {
    const error = new Error('infa_error')
    animeRepository.checkById.mockRejectedValueOnce(error)

    const promise = sut(makeEpisode)

    await expect(promise).rejects.toThrow(error)
  })

  it('should return NotFoundError if CheckAnimeById returns false', async () => {
    animeRepository.checkById.mockResolvedValueOnce(false)

    const promise = sut(makeEpisode)

    await expect(promise).rejects.toThrow(new NotFoundError('animeId'))
  })

  it('should call UpdateEpisodeRepository with correct input', async () => {
    await sut(makeEpisode)

    expect(episodeRepository.update).toHaveBeenCalledWith({ id: '1', animeId: 1, videoUrl: 'any_url', order: 1 })
    expect(episodeRepository.update).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if UpdateEpisodeRepository throw', async () => {
    const error = new Error('infa_error')
    episodeRepository.update.mockRejectedValueOnce(error)

    const promise = sut(makeEpisode)

    await expect(promise).rejects.toThrow(error)
  })

  it('should return undefined on success', async () => {
    const result = await sut(makeEpisode)

    expect(result).toBeUndefined()
  })
})
