const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const { Project } = require("./ProjectModel");
const { Stage } = require("./StageModel");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);

const Task = sequelize.define("task", {
    taskId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    stageId: {
        type: DataTypes.UUID,
        references: {
            model: Stage,
            key: "stageId"
        }
    },
    taskName: DataTypes.STRING(50),
    taskDesc: DataTypes.STRING(100),
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
});

Stage.hasMany(Task, {
    foreignKey: "stageId"
})

const initTask = async () => {
    return Task.sync({ alter: true });
}
module.exports = { Task, initTask };