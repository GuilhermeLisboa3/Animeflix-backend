import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import { AnimeInstance } from "./Anime";
import { UserInstance } from "./User";

export interface FavoriteAttributes {
  userId: number;
  animeId: number;
}

export interface FavoriteInstace
  extends Model<FavoriteAttributes>,
    FavoriteAttributes {
  Anime?: AnimeInstance;
  User?: UserInstance;
}

export const Favorite = sequelize.define<FavoriteInstace, FavoriteAttributes>(
  "Favorite",
  {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    animeId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: { model: "animes", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  }
);
