const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const { Council } = require("./CouncilModel");
const {Student} = require("./StudentModel");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);
// const {} = require('./MajorModel')

const Group = sequelize.define("group", {
    groupId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    groupName: DataTypes.STRING(50),
    groupDesc: DataTypes.STRING(100),
    isScientificGroup: DataTypes.BOOLEAN,
    councilId:{ 
        type: DataTypes.UUID,
        references: {
            model: Council,
            key: "councilId",
        }
    },
    
});

Council.hasMany(Group, {
    foreignKey: "councilId"
})

const initGroup = async () =>{
    return Group.sync({alter: true})
}

module.exports ={Group, initGroup};