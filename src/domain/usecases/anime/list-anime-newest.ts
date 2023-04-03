
export type ListAnimeNewest = () => Promise<Array<{
  id: number
  name: string
  thumbnailUrl: string
  synopsis: string
  featured: boolean
  createdAt?: Date
  updatedAt?: Date
}>>
