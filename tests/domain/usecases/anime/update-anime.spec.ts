import { UpdateAnimeUseCase, UpdateAnime } from '@/domain/usecases/anime'
import { LoadAnimeById, UpdateAnimeRepository } from '@/domain/contracts/database/anime'
import { CheckCategoryById } from '@/domain/contracts/database/category'
import { DeleteFile, UUIDGenerator, UploadFile } from '@/domain/contracts/gateways'
import { NotFoundError } from '@/domain/errors'

import { MockProxy, mock } from 'jest-mock-extended'

describe('UpdateAnimeUseCase', () => {
  let animeRepository: MockProxy<LoadAnimeById & UpdateAnimeRepository>
  let fileStorage: MockProxy<DeleteFile & UploadFile>
  let uuid: MockProxy<UUIDGenerator>
  let categoryRepository: MockProxy<CheckCategoryById>
  let makeAnime: { id: string, file?: { buffer: Buffer, mimeType: string }, categoryId?: number }
  let sut: UpdateAnime

  beforeAll(() => {
    makeAnime = { id: '1', file: { buffer: Buffer.from('any'), mimeType: 'image/png' }, categoryId: 1 }
    animeRepository = mock()
    animeRepository.loadById.mockResolvedValue({ id: 1, name: 'any_name', synopsis: 'any_synopsis', thumbnailUrl: 'any_value', featured: true })
    fileStorage = mock()
    fileStorage.upload.mockResolvedValue('any_url')
    uuid = mock()
    uuid.generate.mockReturnValue('any_key')
    categoryRepository = mock()
    categoryRepository.checkById.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = UpdateAnimeUseCase(animeRepository, fileStorage, uuid, categoryRepository)
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

  it('should rethrow if LoadAnimeById throw', async () => {
    const error = new Error('infa_error')
    animeRepository.loadById.mockRejectedValueOnce(error)

    const promise = sut(makeAnime)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call DeleteFile with correct input', async () => {
    await sut(makeAnime)

    expect(fileStorage.delete).toHaveBeenCalledWith({ fileName: 'any_value' })
    expect(fileStorage.delete).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if DeleteFile throw', async () => {
    const error = new Error('infa_error')
    fileStorage.delete.mockRejectedValueOnce(error)

    const promise = sut(makeAnime)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call UUIDGenerator with correct input', async () => {
    await sut(makeAnime)

    expect(uuid.generate).toHaveBeenCalledWith()
    expect(uuid.generate).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if UUIDGenerator throw', async () => {
    const error = new Error('infa_error')
    uuid.generate.mockImplementationOnce(() => { throw error })

    const promise = sut(makeAnime)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call UploadFile with correct input', async () => {
    await sut(makeAnime)

    expect(fileStorage.upload).toHaveBeenCalledWith({ file: Buffer.from('any'), fileName: 'any_key.png' })
    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if UploadFile throw', async () => {
    const error = new Error('infa_error')
    fileStorage.upload.mockImplementationOnce(() => { throw error })

    const promise = sut(makeAnime)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call CheckCategoryId with correct input', async () => {
    await sut(makeAnime)

    expect(categoryRepository.checkById).toHaveBeenCalledWith({ id: 1 })
    expect(categoryRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('should return NotFoundError if CheckCategoryById returns false', async () => {
    categoryRepository.checkById.mockResolvedValueOnce(false)

    const promise = sut(makeAnime)

    await expect(promise).rejects.toThrow(new NotFoundError('categoryId'))
  })

  it('should rethrow if CheckCategoryId throw', async () => {
    const error = new Error('infa_error')
    categoryRepository.checkById.mockImplementationOnce(() => { throw error })

    const promise = sut(makeAnime)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call UpdateAnime with correct input', async () => {
    await sut(makeAnime)

    expect(animeRepository.update).toHaveBeenCalledWith({ id: '1', thumbnailUrl: 'any_url', categoryId: 1 })
    expect(animeRepository.update).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if UpdateAnime throw', async () => {
    const error = new Error('infa_error')
    animeRepository.update.mockImplementationOnce(() => { throw error })

    const promise = sut(makeAnime)

    await expect(promise).rejects.toThrow(error)
  })

  it('should return undefined on success', async () => {
    const result = await sut(makeAnime)

    expect(result).toBeUndefined()
  })
})
