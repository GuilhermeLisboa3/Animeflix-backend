import { Model, Optional, DataTypes, Sequelize, ModelCtor } from 'sequelize'

export interface AccountAttributes {
  id: string
  firstName: string
  lastName: string
  phone: string
  birth: Date
  email: string
  password: string
  role: 'admin' | 'user'
}

export interface CreateAccountAttributes extends Optional<AccountAttributes, 'id'> {}

export interface AccountInstance extends Model<AccountAttributes, CreateAccountAttributes>, AccountAttributes {}

export default (sequelize: Sequelize): ModelCtor<AccountInstance> => {
  const Account = sequelize.define<AccountInstance, AccountAttributes>('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING
    },
    birth: {
      allowNull: false,
      type: DataTypes.DATE
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isIn: [['admin', 'user']]
      }
    }
  })
  return Account
}
