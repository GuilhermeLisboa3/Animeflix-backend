import { GetAnimeByIdUseCase, GetAnimeById } from '@/domain/usecases/anime'
import { LoadAnimeById } from '@/domain/contracts/database/anime'
import { LoadEpisodeByAnimeId } from '@/domain/contracts/database/episode'
import { CheckLike } from '@/domain/contracts/database/like'

import { MockProxy, mock } from 'jest-mock-extended'
import { NotFoundError } from '@/domain/errors'

describe('GetAnimeById', () => {
  let animeRepository: MockProxy<LoadAnimeById>
  let episodeRepository: MockProxy<LoadEpisodeByAnimeId>
  let likeRepository: MockProxy<CheckLike>
  let makeAnime: { id: string, accountId: string }
  let sut: GetAnimeById

  beforeAll(() => {
    makeAnime = { id: '1', accountId: '1' }
    animeRepository = mock()
    animeRepository.loadById.mockResolvedValue({ id: 1, name: 'any_name', synopsis: 'any_synopsis', thumbnailUrl: 'any_thumbnailUrl' })
    episodeRepository = mock()
    episodeRepository.loadByAnimeId.mockResolvedValue([{ id: 1, name: 'any_name', synopsis: 'any_synopsis', order: 1, videoUrl: 'any_value', secondsLong: 1 }])
    likeRepository = mock()
    likeRepository.check.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = GetAnimeByIdUseCase(animeRepository, episodeRepository, likeRepository)
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

  it('should call LoadEpisodeByAnimeId with correct input', async () => {
    await sut(makeAnime)

    expect(episodeRepository.loadByAnimeId).toHaveBeenCalledWith({ animeId: '1' })
    expect(episodeRepository.loadByAnimeId).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if LoadEpisodeByAnimeId throw', async () => {
    const error = new Error('infa_error')
    episodeRepository.loadByAnimeId.mockRejectedValueOnce(error)

    const promise = sut(makeAnime)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call CheckLike with correct input', async () => {
    await sut(makeAnime)

    expect(likeRepository.check).toHaveBeenCalledWith({ userId: 1, animeId: 1 })
    expect(likeRepository.check).toHaveBeenCalledTimes(1)
  })

  it('should return anime on success', async () => {
    const anime = await sut(makeAnime)

    expect(anime).toEqual({
      id: 1,
      name: 'any_name',
      synopsis: 'any_synopsis',
      thumbnailUrl: 'any_thumbnailUrl',
      episodes: [{ id: 1, name: 'any_name', synopsis: 'any_synopsis', order: 1, videoUrl: 'any_value', secondsLong: 1 }],
      liked: true
    })
  })
})
