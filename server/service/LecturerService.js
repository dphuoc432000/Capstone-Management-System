const {Lecturer} = require("../db/models/LecturerModel")
const userService = require("./UserService");
const checkObject = require('../utils/checkObject')

class LecturerService {
    
    addLecturer = async ({email, password}) =>{
        const userData = await userService.addUser({email, password});
        if(!checkObject(userData)){
           return null;
        } 
        let userId;
        userId = userData.userId;
        const lecturerData = await Lecturer.findOrCreate({
            where: {userId},
            defaults: {
                userId: userId
            }
        })
        let check =  lecturerData.find(lecturerEle =>{
            return typeof lecturerEle === 'boolean';
        })
        return check?lecturerData[0]:"USERID DUPPLICATE";
    }
}

module.exports = new LecturerService();