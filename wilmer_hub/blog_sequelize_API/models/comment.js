const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/sequelize');

class Comment extends Model { }

Comment.init(
    {
        // Model attributes are defined here
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Posts',
                key: 'id'
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        },
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'Comment', // We need to choose the model name
        tableName: 'Comments'
    },
);


module.exports = Comment
