import { filterLastEpisodesByAnime } from '@/domain/entities'

describe('filterLastEpisodesByAnime', () => {
  let makeEpisode: [{ id: number, name: string, synopsis: string, order: number, videoUrl: string, secondsLong: number, animeId: number, createdAt: string, updatedAt: string }]

  beforeAll(() => {
    makeEpisode = [{ id: 1, name: 'any_name', synopsis: 'any_synopsis', order: 1, videoUrl: 'any_value', secondsLong: 100, animeId: 1, createdAt: '2023-05-10', updatedAt: '2023-05-10' }]
  })

  it('should add episode if not exists on list', () => {
    const sut = filterLastEpisodesByAnime(makeEpisode)

    expect(sut).toEqual(makeEpisode)
  })
})
