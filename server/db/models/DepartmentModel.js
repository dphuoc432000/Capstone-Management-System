const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);

const Department = sequelize.define("department", {
    depId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    depName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    depDesc: DataTypes.STRING(100)
})

const initDepartment = async () =>{
    return Department.sync({alter: true})
}

module.exports = {Department, initDepartment}

