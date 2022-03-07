const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const { Council } = require("./CouncilModel");
const { Lecturer } = require("./LecturerModel");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);

const CouncilMember = sequelize.define("council_member", {
    councilId: {
        type: DataTypes.UUID,
        references: {
            model: Council,
            key: 'councilId'
        }
    },
    lecturerId: {
        type: DataTypes.UUID,
        references: {
            model: Lecturer,
            key: 'lecturerId'
        },
        primaryKey: true
    },
    roleName: DataTypes.STRING(10),
});

Council.belongsToMany(Lecturer, {
    through: CouncilMember,
    foreignKey: 'councilId'
});

Lecturer.belongsToMany(Council,{
    through: CouncilMember,
    foreignKey:  'lecturerId'
});

const initCouncilMember = async () => {
    return CouncilMember.sync({ alert: true })
}

module.exports = { CouncilMember, initCouncilMember }
