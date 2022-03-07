const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);
const { User } = require('./UserModel');

const Student = sequelize.define("student", {
    stuId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    stuCode: DataTypes.INTEGER,
    gpa: DataTypes.FLOAT(1, 2),
    courseCreadits: DataTypes.INTEGER,
    codeLevel: DataTypes.INTEGER,
    note: DataTypes.STRING(100),
    capstone: DataTypes.STRING(50),
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'userId',
        },
        unique: true,

    },
});

User.hasOne(Student, {
    foreignKey: 'userId',
})

const initStudent = async () => {
    return Student.sync({ alter: true })
}

module.exports = { Student, initStudent };