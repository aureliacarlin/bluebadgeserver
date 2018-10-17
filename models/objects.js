module.exports = (sequelize, DataTypes) => {
    const Robject = sequelize.define('object', {
        randomObject: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })
    return Robject 
}