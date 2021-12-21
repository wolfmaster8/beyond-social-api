import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface PostLikeAttributes {
  id: number
  userId: number
  postId: number
  createdAt?: Date
  updatedAt?: Date
}

export interface PostLikeInput
  extends Optional<PostLikeAttributes, 'userId' | 'postId'> {}

export interface PostLikeOutput extends Required<PostLikeAttributes> {}

class PostLike
  extends Model<PostLikeAttributes, PostLikeInput>
  implements PostLikeAttributes
{
  public id!: number

  public postId!: number

  public userId!: number

  public readonly createdAt!: Date

  public readonly updatedAt!: Date
}

PostLike.init(
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
    postId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: 'post_id',
      references: {
        key: 'id',
        model: 'posts',
      },
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
    tableName: 'post_likes',
  }
)

export default PostLike
