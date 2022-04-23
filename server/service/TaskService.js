const {ListTask} = require("../db/models/ListTaskModel");
const {Task} = require("../db/models/TaskModel");
const TaskAssignmentService = require("./TaskAssignmentService");

class TaskService {

    checkListTask = async (stageId, listTaskId) =>{
        return await ListTask.findOne({
            where:{
                stageId, listTaskId
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


    addTask = async (stageId, listTaskId, task, studentIds) =>{
        const checkListTask = await this.checkListTask(stageId, listTaskId);
        if(checkListTask){
            //theem task
            return await Task.create(task)
                .then(async data => {
                    if(data){
                        //gán member,
                        if(studentIds && studentIds.length > 0 && await this.checkTask(listTaskId, data.taskId)){
                            console.log(studentIds)
                            await TaskAssignmentService.assignMembers(data.taskId, studentIds);
                        }
                        return true;
                    }
                    return false;
                });
        }
        return "NO TASK LIST";
    }

    updateTask = async (stageId, listTaskId, taskId, task) =>{
        const checkListTask = await this.checkListTask(stageId, listTaskId);
        if(checkListTask){
            // update task
            await Task.update(task,{
                where:{
                    listTaskId,
                    taskId
                }
            })

            //update member
            if("studentIds" in task && task.studentIds.length > 0){
                console.log(task)
                if(await this.checkTask(listTaskId, taskId))
                    await TaskAssignmentService.updateMembers(taskId, task.studentIds, []);
            }
            if("deleteStudentIds" in task && task.deleteStudentIds.length > 0){
                // console.log(task.deleteStudentIds)
                if(await this.checkTask(listTaskId, taskId))
                    await TaskAssignmentService.updateMembers(taskId, [], task.deleteStudentIds);
            }
            return true;
        }
        return "NO TASK LIST";
    }

    changeTaskId = async (oldTaskId, newTaskId) =>{
        return await TaskAssignment.update({
            taskId: newTaskId
        },{
            where:{
                taskId: oldTaskId
            }
        }).then(count => count[0] > 0? true: false);
    }

    //di chuyển task từ task_listlist cũ sang task_list mới
    moveTaskToListTaskOther = async (stageId, oldListTaskId, taskId, newListTaskId) =>{
        //kieểm tra 2 listTaskId 
        const checkListTaskOld = await this.checkListTask(stageId, oldListTaskId);
        const checkListTaskNew = await this.checkListTask(stageId, newListTaskId);
        const checkTask = await this.checkTask(oldListTaskId, taskId);
        if(checkListTaskOld && checkListTaskNew && checkTask){
            if(oldListTaskId !== newListTaskId){
                return await Task.update({
                    listTaskId: newListTaskId,
                },{
                    where:{
                        taskId,
                        listTaskId: oldListTaskId,
                    }
                }).then(data => data[0] > 0?true:false)
            }
            return "DUPLICATE TASK LIST";
        }
        return "NO TASK LIST OR TASK"
    }

    //Chưa xong
    deleteTask = async (stageId, listTaskId, taskId) =>{
        const checkListTask = await this.checkListTask(stageId, listTaskId);
        const checkTask = await this.checkTask(listTaskId, taskId);
        if(checkListTask && checkTask){
            return await Task.destroy({
                where:{
                    listTaskId,
                    taskId
                }
            }).then(count =>{
                return count>0?true:false;
            })
        }
        return "NO TASK LIST OR TASK";
    }

    getAllTaskOfTaskList = async (stageId, listTaskId) =>{
        const checkListTask = await this.checkListTask(stageId, listTaskId);
        if(checkListTask){
            return await Task.findAll({
                where:{
                    listTaskId
                }, raw: true
            }).then(async data => {
                if(data) {
                    data = await Promise.all(data.map(async task =>{
                        return {
                            ...task,
                            members: await TaskAssignmentService.getAllMemberOfTask(task.taskId)
                        }
                    }))
                }
                return data;
            })
        }
        return "NO TASK LIST";
    }

    getTaskDetailOfTaskList = async (stageId, listTaskId, taskId) =>{
        const checkListTask = await this.checkListTask(stageId, listTaskId);
        if(checkListTask){
            return await Task.findOne({
                where:{
                    listTaskId,
                    taskId
                }, raw: true
            }).then(async data => {
                if(data) {
                    return {
                        ...data,
                        members: await TaskAssignmentService.getAllMemberOfTask(data.taskId)
                    }
                }
                return false;
            })
        }
        return "NO TASK LIST";
    }
}

module.exports = new TaskService();
