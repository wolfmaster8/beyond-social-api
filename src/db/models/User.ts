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

export interface UserSanitizedOutput extends Omit<UserOutput, 'password'> {}

export interface UserLogInCredentials
  extends Pick<UserAttributes, 'username' | 'password'> {}

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
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'last_name',
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'username',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'email',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: 'users',
  }
)

export default User
