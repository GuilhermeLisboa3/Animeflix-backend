import { Model, DataTypes, Sequelize, ModelCtor } from 'sequelize'
import { AccountInstance } from './account'
import { AnimeInstance } from './anime'

export interface LikeAttributes {
  userId: number
  animeId: number
}

export interface LikeInstace
  extends Model<LikeAttributes>,
  LikeAttributes {
  Anime?: AnimeInstance
  User?: AccountInstance
}

export default (sequelize: Sequelize): ModelCtor<LikeInstace> => {
  const Like = sequelize.define<LikeInstace, LikeAttributes>('Like', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    animeId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: { model: 'animes', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  })
  return Like
}
