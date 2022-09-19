import { WatchTimeInstance } from "./WatchTime";
import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface Episode {
  id: number;
  name: string;
  synopsis: string;
  order: number;
  videoUrl: string;
  secondsLong: number;
  animeId: number;
}

export interface EpisodeCreationAttributes
  extends Optional<Episode, "id" | "videoUrl" | "secondsLong"> {}

export interface EpisodeInstance
  extends Model<Episode, EpisodeCreationAttributes>,
    Episode {
  watchTime?: WatchTimeInstance;
}

export const Episode = sequelize.define<EpisodeInstance, Episode>("Episode", {
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
  order: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  videoUrl: {
    type: DataTypes.STRING,
  },
  secondsLong: {
    type: DataTypes.INTEGER,
  },
  animeId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "animes", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
});
