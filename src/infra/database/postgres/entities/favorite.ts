import { Model, DataTypes, Sequelize, ModelCtor } from 'sequelize'
import { AccountInstance } from './account'
import { AnimeInstance } from './anime'

export interface FavoriteAttributes {
  userId: number
  animeId: number
}

export interface FavoriteInstace
  extends Model<FavoriteAttributes>,
  FavoriteAttributes {
  Anime?: AnimeInstance
  User?: AccountInstance
}

export default (sequelize: Sequelize): ModelCtor<FavoriteInstace> => {
  const Favorite = sequelize.define<FavoriteInstace, FavoriteAttributes>('Favorite', {
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
  return Favorite
}
