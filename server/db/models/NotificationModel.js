const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const { User } = require("./UserModel");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);

const Notification = sequelize.define("notification", {
    notificationId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'userId'
        }
    },

})

User.hasMany(Notification, { foreignKey: 'userId' });

const initNotification = async () => {
    return Notification.sync({ alter: true })
}

module.exports = { Notification, initNotification }

