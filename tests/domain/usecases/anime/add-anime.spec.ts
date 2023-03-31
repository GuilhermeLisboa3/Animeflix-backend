import { AddAnimeUseCase, AddAnime } from '@/domain/usecases/anime'
import { CheckAnime, CreateAnime } from '@/domain/contracts/database/anime'
import { UUIDGenerator, UploadFile, DeleteFile } from '@/domain/contracts/gateways'
import { CheckCategoryById } from '@/domain/contracts/database/category'

import { mock, MockProxy } from 'jest-mock-extended'
import { FieldInUseError, NotFoundError } from '@/domain/errors'

describe('AddAnime', () => {
  let animeRepository: MockProxy<CheckAnime & CreateAnime>
  let categoryRepository: MockProxy<CheckCategoryById>
  let uuid: MockProxy<UUIDGenerator>
  let fileStorage: MockProxy<UploadFile & DeleteFile>
  let anime: { name: string, categoryId: number, file: { buffer: Buffer, mimeType: string }, synopsis: string, featured?: boolean }
  let sut: AddAnime

  beforeAll(() => {
    animeRepository = mock()
    animeRepository.check.mockResolvedValue(false)
    categoryRepository = mock()
    categoryRepository.checkById.mockResolvedValue(true)
    uuid = mock()
    uuid.generate.mockReturnValue('any_key')
    fileStorage = mock()
    fileStorage.upload.mockResolvedValue('any_url')
    anime = { name: 'Any_name', categoryId: 1, file: { buffer: Buffer.from('any'), mimeType: 'image/png' }, synopsis: 'any_synopsis' }
  })

  beforeEach(() => {
    sut = AddAnimeUseCase(animeRepository, categoryRepository, uuid, fileStorage)
  })

  it('should call CheckAnime with correct input', async () => {
    await sut(anime)

    expect(animeRepository.check).toHaveBeenCalledWith({ name: 'any_name' })
    expect(animeRepository.check).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldInUseError if CheckAnime return true', async () => {
    animeRepository.check.mockResolvedValueOnce(true)

    const promise = sut(anime)

    await expect(promise).rejects.toThrow(new FieldInUseError('name'))
  })

  it('should call CheckCategoryById with correct input', async () => {
    await sut(anime)

    expect(categoryRepository.checkById).toHaveBeenCalledWith({ id: 1 })
    expect(categoryRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('should return NotFoundError if CheckCategoryById returns false', async () => {
    categoryRepository.checkById.mockResolvedValueOnce(false)

    const promise = sut(anime)

    await expect(promise).rejects.toThrow(new NotFoundError('categoryId'))
  })

  it('should call UUIDGenerator with correct input', async () => {
    await sut(anime)

    expect(uuid.generate).toHaveBeenCalledWith()
    expect(uuid.generate).toHaveBeenCalledTimes(1)
  })

  it('should call UploadFile with correct input', async () => {
    await sut(anime)

    expect(fileStorage.upload).toHaveBeenCalledWith({ file: Buffer.from('any'), fileName: 'any_key.png' })
    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
  })

  it('should call CreateAnime with correct input', async () => {
    await sut(anime)

    expect(animeRepository.create).toHaveBeenCalledWith({ name: 'any_name', categoryId: 1, synopsis: 'any_synopsis', thumbnailUrl: 'any_url' })
    expect(animeRepository.create).toHaveBeenCalledTimes(1)
  })

  it('should call DeleteFile when file exists and CreateAnime throws', async () => {
    const error = new Error()
    animeRepository.create.mockRejectedValueOnce(error)

    const promise = sut(anime)

    promise.catch(() => {
      expect(fileStorage.delete).toHaveBeenCalledWith({ fileName: 'any_key.png' })
      expect(fileStorage.delete).toHaveBeenCalledTimes(1)
    })
  })

  it('should return undefined on success', async () => {
    const result = await sut(anime)

    expect(result).toBeUndefined()
  })
})
