const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const { Group } = require("./GroupModel");
const { Lecturer } = require("./LecturerModel");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);

const Project = sequelize.define("project", {
    projectId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    projectName: DataTypes.STRING(50),
    projectDesc: DataTypes.STRING(100),
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    note: DataTypes.STRING(50),
    lecturerId: {
        type: DataTypes.UUID, 
        references: {
            model: Lecturer,
            key: 'lecturerId'
        }
    },
    groupId: {
        type: DataTypes.UUID,
        references: {
            model: Group,
            key: "groupId",
        }
    },
    isApproved: DataTypes.BOOLEAN,
    isRegisterd: DataTypes.BOOLEAN,
});

Lecturer.hasMany(Project,{
    foreignKey: 'lecturerId'
})
Group.hasOne(Project,{
    foreignKey: 'groupId'
})
const initProject = async () => {
    return  Project.sync({alert: true})
}
module.exports = { Project, initProject };