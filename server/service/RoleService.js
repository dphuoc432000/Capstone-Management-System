const {Role} = require("../db/postgresql/PostgreSQL");


class RoleService {

    //Thêm role
    addRole = async (roleName) => {
        const roleMentor = await Role.create({roleName: roleName.trim()})
        return roleMentor;
    }

    //Lấy thông tin role theo rolName
    getRoleByRoleName = async (roleName) =>{
        const role = await Role.findOne({
            where:{
                roleName
            }, raw: true
        })
        // console.log(role);
        return role;
    }

}

module.exports = new RoleService();