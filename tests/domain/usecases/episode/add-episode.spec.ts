import { AddEpisodeUseCase, AddEpisode } from '@/domain/usecases/episode'
import { CheckAnimeById } from '@/domain/contracts/database/anime'
import { CheckEpisodeByOrder, CreateEpisode } from '@/domain/contracts/database/episode'

import { mock, MockProxy } from 'jest-mock-extended'
import { FieldInUseError, NotFoundError } from '@/domain/errors'
import { UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'

describe('AddEpisodeUseCase', () => {
  let animeRepository: MockProxy<CheckAnimeById>
  let episodeRepository: MockProxy<CheckEpisodeByOrder & CreateEpisode>
  let uuid: MockProxy<UUIDGenerator>
  let fileStorage: MockProxy<UploadFile>
  let makeEpisode: { animeId: number, order: number, name: string, synopsis: string, file?: { buffer: Buffer, mimeType: string } }
  let sut: AddEpisode

  beforeAll(() => {
    makeEpisode = { animeId: 1, name: 'any_name', order: 1, synopsis: 'any_synopsis', file: { buffer: Buffer.from('any'), mimeType: 'video/mp4' } }
    animeRepository = mock()
    animeRepository.checkById.mockResolvedValue(true)
    episodeRepository = mock()
    episodeRepository.checkByOrder.mockResolvedValue(false)
    uuid = mock()
    uuid.generate.mockReturnValue('any_key')
    fileStorage = mock()
    fileStorage.upload.mockResolvedValue('any_url')
  })

  beforeEach(() => {
    sut = AddEpisodeUseCase(animeRepository, episodeRepository, uuid, fileStorage)
  })

  it('should call CheckAnimeById with correct input', async () => {
    await sut(makeEpisode)

    expect(animeRepository.checkById).toHaveBeenCalledWith({ id: 1 })
    expect(animeRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('should return NotFoundError if CheckAnimeById returns false', async () => {
    animeRepository.checkById.mockResolvedValueOnce(false)

    const promise = sut(makeEpisode)

    await expect(promise).rejects.toThrow(new NotFoundError('animeId'))
  })

  it('should call CheckEpisodeByOrder with correct input', async () => {
    await sut(makeEpisode)

    expect(episodeRepository.checkByOrder).toHaveBeenCalledWith({ order: 1 })
    expect(episodeRepository.checkByOrder).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldInUseError if CheckEpisodeByOrder return true', async () => {
    episodeRepository.checkByOrder.mockResolvedValueOnce(true)

    const promise = sut(makeEpisode)

    await expect(promise).rejects.toThrow(new FieldInUseError('order'))
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

  it('should call CreateEpisode with correct input', async () => {
    await sut(makeEpisode)

    expect(episodeRepository.create).toHaveBeenCalledWith({ name: 'any_name', animeId: 1, synopsis: 'any_synopsis', videoUrl: 'any_url', order: 1 })
    expect(episodeRepository.create).toHaveBeenCalledTimes(1)
  })
})
