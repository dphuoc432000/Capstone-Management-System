const { Group } = require("../db/models/GroupModel");
const { Project } = require("../db/models/ProjectModel");
const { Student } = require("../db/models/StudentModel");
const { User } = require("../db/models/UserModel");

class ProjectService {

    //cập nhật topic lúc chưa bắt đầu
    //Topic chưa bắt đầu thực hiện có 2 TH:
    //TH1: Topic chưa approved thì update vẫn bt.
    //TH2: Topic đã được approved nhưng update lại thì phải được approved lại. => isApproved = pending
    //VD TH2: nếu như topic khó tốt đã được approved. Bây giờ cập nhật lại topic dễ hơn nhưng vẫn approved thì không chính xác.
    updateProjectNoStart = async (projectId, project) =>{
        project.isApproved = "pending";
        return await Project.findOne({where:{projectId}, raw: true})
            .then(async data =>{
                if(data){
                    return await Project.update(project,{
                        where:{
                            projectId
                        }
                    });
                }
                return false;
            })
    }

    //chặn không cho cập nhật projectName, projectDesc,
    //isApproved = approved
    updateProjectStart = async (projectId, project) =>{
        //kiểm tra có trường projectName hany projectDesc trong project object không
        //Nếu có. không cho phép cập nhật. 
        //Nếu không. Cho phép cập nhật
        let checkHasFieldProjectNameOrProjectDesc = false;
        checkHasFieldProjectNameOrProjectDesc = Object.keys(project).find(key =>{
            return ["projectName", "projectDesc"].includes(key);
        })?true:false;
        if(!checkHasFieldProjectNameOrProjectDesc){
            // // trường hợp người ta thay đổi thì nên set mặc định
            // project.isApproved = "approved";
            return await Project.findOne({where:{projectId}, raw: true})
                .then(async data =>{
                    if(data){
                        //kiểm tra thử project đã được approved chưa
                        if(data.isApproved === "approved")
                            return await Project.update(project,{
                                where:{
                                    projectId
                                }
                            })
                        return "NO APPROVED"
                    }
                    return false;
                })
        }
        return "NOT ALLOWED";
    }

    getAllProjectByTypeCapstone = async (typeCapstone) =>{
        return await Group.findAll({where:{typeCapstone},raw:true})
            .then(async arr => {
                if(arr){
                    return await Promise.all(arr.map(async group =>{
                        delete group.createdAt;
                        delete group.updatedAt;
                        const project = await Project.findOne({
                            where:{
                                groupId: group.groupId
                            }, raw: true
                        })
                        if(project){
                            delete project.createdAt;
                            delete project.updatedAt;
                            delete project.groupId;
                            delete project.startDate;
                            delete project.endDate;

                            const stuLeader = await Student.findOne({
                                where: {
                                    stuId: project.leaderId
                                },
                                raw: true
                            })
                            const userLeader = await User.findOne({
                                where:{
                                    userId: stuLeader.userId
                                }
                            }) 
                            const leaderData = {
                                firstName: userLeader.firstName,
                                lastName: userLeader.lastName,
                                email: userLeader.email,
                                phone: userLeader.phone,
                                stuCode: stuLeader.stuCode
                            }
                            delete project.leaderId;
                            project.leader = leaderData;
                        }
                        group.project = project;
                        return group;
                    }))
                }
                return arr;
            })
    }

    rejectTopic = async (projectId) =>{
        return await Project.findOne({
            where:{
                projectId
            }, raw: true
        })
        .then(async data =>{
            if(data){
                await Project.update({isApproved: "reject"},{
                    where: {
                        projectId
                    }
                });
                return true;
            }
            return false;
        })
    }

    approvedTopic = async (projectId) =>{
        return await Project.findOne({
            where:{
                projectId
            }, raw: true
        })
        .then(async data =>{
            if(data){
                await Project.update({isApproved: "approved"},{
                    where: {
                        projectId
                    }
                });
                return true;
            }
            return false;
        })
    }

}

module.exports = new ProjectService();