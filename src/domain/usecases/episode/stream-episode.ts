export type StreamEpisode = (input: { animeId: string, order: string }) => Promise<string | undefined>
