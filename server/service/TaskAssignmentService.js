const { Student } = require("../db/models/StudentModel");
const { TaskAssignment } = require("../db/models/TaskAssigmentModel");
const { Task } = require("../db/models/TaskModel");
const StudentService = require("./StudentService");

class TaskAssignmentService{
    
    checkStudent = async (stuId) =>{
        return await Student.findOne({
            where:{
                stuId,
                isApproved: true
            }, raw: true
        })
        .then(data => data?true:false);
    }

    checkTask = async (listTaskId ,taskId) =>{
        return await Task.findOne({
            where:{
                listTaskId,
                taskId
            }
        }).then(data => data?true:false);
    }

    checkStudentAssignInTask = async (taskId, stuId) =>{
        return await TaskAssignment.findOne({
            where:{
                taskId, 
                stuId
            }, raw: true
        }).then(data => data?true:false);
    }
    
    // assignMembers = async (listTaskId, taskId, studentIds) =>{
    assignMembers = async (taskId, studentIds) =>{
        // if(await this.checkTask(listTaskId, taskId)){
            //check mảng studentIds co student và student đã được gán trong task
            let studentIdsNew = [];
            for (const stuId of studentIds) {
                if(await this.checkStudent(stuId) && !await this.checkStudentAssignInTask(taskId, stuId))
                    studentIdsNew.push(stuId);
            }
            if(studentIdsNew.length > 0){
                studentIdsNew = studentIdsNew.map(stuId =>{
                    return {
                        stuId,
                        taskId
                    }
                })
                // return await TaskAssignment.bulkCreate(studentIdsNew)
                //     .then(data => data.length > 0? true: false)
                await TaskAssignment.bulkCreate(studentIdsNew);
            }
            else
                console.log("Không có student được gán");
            // return "NO MEMBERS"
        // }
        // return "NO TASK";
    }

    // updateMembers = async (listTaskId, taskId, studentIds, deleteStudentIds) =>{
    updateMembers = async (taskId, studentIds, deleteStudentIds) =>{
        // console.log( studentIds, deleteStudentIds);
        // if(await this.checkTask(listTaskId, taskId)){
            //nếu student mới được thêm vào có trong mảng StudentId
            //thì thêm vào db
            if(studentIds && studentIds.length > 0){
                //check mảng studentIds co student và student đã được gán trong task
                await this.assignMembers(taskId, studentIds);
            }

            //nếu student bị xoá gán task thêm vào trong mảng deleteStudentIds
            //xoá khoi db
            if(deleteStudentIds && deleteStudentIds.length > 0){
                await TaskAssignment.destroy({
                    where:{
                        stuId: deleteStudentIds,
                    }
                })
            }
        // }
        // return "NO TASK";
    }

    getAllMemberOfTask = async (taskId) =>{
        return await TaskAssignment.findAll({
            where:{
                taskId,
            }, raw: true
        }).then(async data =>{
            if(data && data.length > 0){
                data = await Promise.all(data.map(async member =>{
                    return await StudentService.getStudentByStuId(member.stuId);
                }))
            }
            return data;
        })
    }
}

module.exports = new TaskAssignmentService();