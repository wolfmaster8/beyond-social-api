import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface UserAttributes {
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UserInput
  extends Optional<
    UserAttributes,
    'username' | 'email' | 'firstName' | 'lastName' | 'password'
  > {}

export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number

  public username!: string

  public firstName!: string

  public lastName!: string

  public email!: string

  public password!: string

  public readonly createdAt!: Date

  public readonly updatedAt!: Date
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
  }
)

export default User
