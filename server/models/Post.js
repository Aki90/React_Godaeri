module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    contents: {
      type: DataTypes.TEXT, // 매우 긴 글
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  // 관계 연결
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // UserId
  };
  
  return Post;
};