import { DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../config'
import User from './User'

interface PostCommentAttributes {
  id: number
  userId: number
  postId: number
  content: string
  createdAt?: Date
  updatedAt?: Date
}

export interface PostCommentInput
  extends Pick<PostCommentAttributes, 'content' | 'userId' | 'postId'> {}

export interface PostCommentOutput extends Required<PostCommentAttributes> {}

class PostComment
  extends Model<PostCommentAttributes, PostCommentInput>
  implements PostCommentAttributes
{
  public id!: number

  public content!: string

  public postId!: number

  public userId!: number

  public readonly createdAt!: Date

  public readonly updatedAt!: Date
}

PostComment.init(
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
    tableName: 'post_comments',
  }
)

PostComment.belongsTo(User, { foreignKey: 'userId', as: 'user' })

export default PostComment
