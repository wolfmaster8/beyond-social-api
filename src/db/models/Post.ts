import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface PostAttributes {
  id: number
  userId: number
  content: string
  createdAt?: Date
  updatedAt?: Date
}

export interface PostInput
  extends Optional<PostAttributes, 'content' | 'userId'> {}

export interface PostOutput extends Required<PostAttributes> {}

class Post extends Model<PostAttributes, PostInput> implements PostAttributes {
  public id!: number

  public content!: string

  public userId!: number

  public readonly createdAt!: Date

  public readonly updatedAt!: Date
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: 'user_id',
      references: {
        key: 'id',
        model: 'users',
      },
    },

    content: {
      type: DataTypes.TEXT,
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
    tableName: 'posts',
    charset: 'utf8mb4',
  }
)

export default Post
