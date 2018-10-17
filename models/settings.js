module.exports = (sequelize, DataTypes) => {
    const Settings = sequelize.define('settings', {
        objectSetting: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    return Settings;
}