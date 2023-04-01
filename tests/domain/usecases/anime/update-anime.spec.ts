import { UpdateAnimeUseCase, UpdateAnime } from '@/domain/usecases/anime'
import { LoadAnimeById } from '@/domain/contracts/database/anime'
import { DeleteFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { NotFoundError } from '@/domain/errors'

import { MockProxy, mock } from 'jest-mock-extended'

describe('UpdateAnimeUseCase', () => {
  let animeRepository: MockProxy<LoadAnimeById>
  let fileStorage: MockProxy<DeleteFile>
  let uuid: MockProxy<UUIDGenerator>
  let makeAnime: { id: string, file?: { buffer: Buffer, mimeType: string }, categoryId?: number }
  let sut: UpdateAnime

  beforeAll(() => {
    makeAnime = { id: '1', file: { buffer: Buffer.from('any'), mimeType: 'image/png' }, categoryId: 1 }
    animeRepository = mock()
    animeRepository.loadById.mockResolvedValue({ id: 1, name: 'any_name', synopsis: 'any_synopsis', thumbnailUrl: 'any_value' })
    fileStorage = mock()
    uuid = mock()
  })

  beforeEach(() => {
    sut = UpdateAnimeUseCase(animeRepository, fileStorage, uuid)
  })

  it('should call LoadAnimeById with correct input', async () => {
    await sut(makeAnime)

    expect(animeRepository.loadById).toHaveBeenCalledWith({ id: '1' })
    expect(animeRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return NotFoundError if LoadAnimeById returns undefined', async () => {
    animeRepository.loadById.mockResolvedValueOnce(undefined)

    const promise = sut(makeAnime)

    await expect(promise).rejects.toThrow(new NotFoundError('id'))
  })

  it('should call DeleteFile with correct input', async () => {
    await sut(makeAnime)

    expect(fileStorage.delete).toHaveBeenCalledWith({ fileName: 'any_value' })
    expect(fileStorage.delete).toHaveBeenCalledTimes(1)
  })

  it('should call UUIDGenerator with correct input', async () => {
    await sut(makeAnime)

    expect(uuid.generate).toHaveBeenCalledWith()
    expect(uuid.generate).toHaveBeenCalledTimes(1)
  })
})
