'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    body: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo( models.User, { foreignKey: 'userId' } )
  };
  return Post;
};