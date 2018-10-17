module.exports = function (sequelize, DataTypes) {
    const ourStory = sequelize.define('story', {
        userStory: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        owner: {
           type: DataTypes.INTEGER,
           allowNull: false 
        }
    })
    return ourStory
}