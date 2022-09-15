import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export interface LikeAttibutes {
  userId: number;
  animeId: number;
}

export interface LikeInstance extends Model<LikeAttibutes>, LikeAttibutes {}

export const Like = sequelize.define<LikeInstance,LikeAttibutes>("Like",{
    userId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      animeId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'animes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
})
