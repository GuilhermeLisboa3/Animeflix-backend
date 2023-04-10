export const addEpisodeResponse = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    synopsis: { type: 'string' },
    file: { type: 'string', format: 'binary' },
    animeId: { type: 'number' },
    order: { type: 'number' }
  }
}
