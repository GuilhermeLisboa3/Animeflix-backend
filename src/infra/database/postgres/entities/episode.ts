import { Model, Optional, DataTypes, Sequelize, ModelCtor } from 'sequelize'

export interface EpisodeAttributes {
  id: number
  name: string
  synopsis: string
  order: number
  videoUrl: string
  secondsLong: number
  animeId: number
}

export interface CreateEpisodeAttributes extends Optional<EpisodeAttributes, 'id' | 'videoUrl' | 'secondsLong'> {}

export interface EpisodeInstance extends Model<EpisodeAttributes, CreateEpisodeAttributes>, EpisodeAttributes {}

export default (sequelize: Sequelize): ModelCtor<EpisodeInstance> => {
  const Episode = sequelize.define<EpisodeInstance, EpisodeAttributes>('Episode', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    synopsis: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    order: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    videoUrl: {
      type: DataTypes.STRING
    },
    secondsLong: {
      type: DataTypes.INTEGER
    },
    animeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'animes', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    }
  })
  return Episode
}
