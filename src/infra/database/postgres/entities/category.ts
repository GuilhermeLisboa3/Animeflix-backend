import { Model, Optional, DataTypes, Sequelize, ModelCtor } from 'sequelize'

export interface CategoryAttributes {
  id: string
  name: string
  position: number
}

export interface CreateCategoryAttributes extends Optional<CategoryAttributes, 'id'> {}

export interface CategoryInstance extends Model<CategoryAttributes, CreateCategoryAttributes>, CategoryAttributes {}

export default (sequelize: Sequelize): ModelCtor<CategoryInstance> => {
  const Category = sequelize.define<CategoryInstance, CategoryAttributes>('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    position: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER
    }
  })
  return Category
}
