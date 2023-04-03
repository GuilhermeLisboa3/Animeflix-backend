import { UpdateEpisodeUseCase, UpdateEpisode } from '@/domain/usecases/episode'
import { LoadEpisodeById, CheckEpisodeByOrder } from '@/domain/contracts/database/episode'

import { MockProxy, mock } from 'jest-mock-extended'
import { FieldInUseError, NotFoundError } from '@/domain/errors'
import { DeleteFile, UUIDGenerator, UploadFile } from '@/domain/contracts/gateways'

describe('UpdateEpisodeUseCase', () => {
  let episodeRepository: MockProxy<LoadEpisodeById & CheckEpisodeByOrder>
  let fileStorage: MockProxy<DeleteFile & UploadFile>
  let uuid: MockProxy<UUIDGenerator>
  let makeEpisode: { id: string, file?: { buffer: Buffer, mimeType: string }, animeId?: number, order?: number }
  let sut: UpdateEpisode

  beforeAll(() => {
    makeEpisode = { id: '1', file: { buffer: Buffer.from('any'), mimeType: 'image/mp4' }, animeId: 1, order: 1 }
    episodeRepository = mock()
    episodeRepository.loadById.mockResolvedValue({ videoUrl: 'any_value' })
    fileStorage = mock()
    uuid = mock()
    uuid.generate.mockReturnValue('any_key')
  })

  beforeEach(() => {
    sut = UpdateEpisodeUseCase(episodeRepository, fileStorage, uuid)
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

  it('should call DeleteFile with correct input', async () => {
    await sut(makeEpisode)

    expect(fileStorage.delete).toHaveBeenCalledWith({ fileName: 'any_value' })
    expect(fileStorage.delete).toHaveBeenCalledTimes(1)
  })

  it('should call UUIDGenerator with correct input', async () => {
    await sut(makeEpisode)

    expect(uuid.generate).toHaveBeenCalledWith()
    expect(uuid.generate).toHaveBeenCalledTimes(1)
  })

  it('should call UploadFile with correct input', async () => {
    await sut(makeEpisode)

    expect(fileStorage.upload).toHaveBeenCalledWith({ file: Buffer.from('any'), fileName: 'any_key.mp4' })
    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
  })
})
