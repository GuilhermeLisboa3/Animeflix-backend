import { Optional, Model, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface AnimeAttributes {
  id: number;
  name: string;
  synopsis: string;
  thumbnailUrl: string;
  featured: boolean;
  categoryId: number;
}

export interface AnimeCreationAttributes
  extends Optional<AnimeAttributes, "id" | "thumbnailUrl" | "featured"> {}

export interface AnimeInstance
  extends Model<AnimeCreationAttributes, AnimeAttributes>,
    AnimeAttributes {}

export const Anime = sequelize.define<AnimeInstance, AnimeAttributes>(
  "Animes",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    synopsis: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
    },
    featured: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "categories", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
  }
);
