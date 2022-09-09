import { Optional, Model, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface CategoryAttributes {
  id: number;
  name: string;
  position: number;
}

export interface CategoryCreationAttibutes
  extends Optional<CategoryAttributes, "id"> {}

export interface CategoryInstace
  extends Model<CategoryAttributes, CategoryCreationAttibutes>,
    CategoryAttributes {}

export const Category = sequelize.define<CategoryInstace, CategoryAttributes>(
  "Category",
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
    position: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }
);
