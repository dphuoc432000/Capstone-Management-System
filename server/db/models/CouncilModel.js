const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);

const Council = sequelize.define("council", {
    councilId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    councilName: DataTypes.STRING(50),
    councilDesc: DataTypes.STRING(100),
    note: DataTypes.STRING(50),
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    location: DataTypes.STRING(100),
});

const initCouncil = async () => {
    return Council.sync({ alert: true });
}

module.exports = { Council, initCouncil }
