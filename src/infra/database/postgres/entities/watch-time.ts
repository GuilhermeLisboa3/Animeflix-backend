import { Model, DataTypes, Sequelize, ModelCtor } from 'sequelize'

export interface WatchTimeAttributes {
  seconds: number
  userId: number
  episodeId: number
}

export interface WatchTimeInstance extends Model<WatchTimeAttributes>, WatchTimeAttributes {}

export default (sequelize: Sequelize): ModelCtor<WatchTimeInstance> => {
  const WatchTime = sequelize.define<WatchTimeInstance, WatchTimeAttributes>('WatchTime', {
    seconds: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    episodeId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: { model: 'episodes', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  })
  return WatchTime
}
