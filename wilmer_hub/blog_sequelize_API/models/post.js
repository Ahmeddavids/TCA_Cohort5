const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/sequelize');
const Comment = require('./comment');

class Post extends Model {}

Post.init(
  {
    // Model attributes are defined here
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    commentId: {
      type: DataTypes.UUID,
      references: {
        model: 'Comments',
        key: 'id'
      },
      onUpdate: "CASCADE",
      onDelete: 'CASCADE'
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Post', // We need to choose the model name
    tableName: 'Posts'
  },
);

Post.hasMany(Comment, {
  foreignKey: 'postId',
  as: 'Comments'
})

Comment.belongsTo(Post, {
  foreignKey: "commentId",
  as: 'Post'
})

module.exports = Post
