const { GroupLecturer } = require("../db/models/GroupLecturerModel");
const { Group } = require("../db/models/GroupModel");
const { Project } = require("../db/models/ProjectModel");
const { Student } = require("../db/models/StudentModel");
const { User } = require("../db/models/UserModel");
const lecturerService = require("./LecturerService");
const exceljs = require("exceljs");
const groupService = require("./GroupService");
const MajorService = require("./MajorService");
const DepartmentService = require("./DepartmentService");
const { FileStorage } = require("../db/models/FileStorageModel");
const {Op} = require("sequelize");
const { ProjectFile } = require("../db/models/ProjectFileModel");
const LecturerService = require("./LecturerService");
const FileStorageService = require("./FileStorageService")

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

    //cho student
    getAllProjectByTypeCapstone = async (typeCapstone) =>{
        return await Group.findAll({
            where:{typeCapstone},
            raw:true,
            order:[
                ["groupName","ASC"]
            ]
        })
            .then(async arr => {
                if(arr){
                    return await Promise.all(arr.map(async group =>{
                        delete group.createdAt;
                        delete group.updatedAt;
                        const project = await Project.findOne({
                            where:{
                                groupId: group.groupId,
                                lecturerId: null
                            }, raw: true
                        })
                        if(project){
                            delete project.groupId;
                            delete project.startDate;
                            delete project.endDate;

                            const leaderData = await Student.findOne({
                                where: {
                                    stuId: project.leaderId
                                },
                                attributes:[
                                    "stuId",
                                    "stuCode", 
                                    "gpa",
                                    "note",
                                    "typeCapstone",
                                    "class",
                                    "userId"
                                ],
                                raw: true
                            }).then(async data =>{
                                const userLeader = await User.findOne({
                                    where:{
                                        userId: data.userId
                                    },
                                    raw: true,
                                    attributes: [
                                        "userId",
                                        "firstName",
                                        "lastName",
                                        "email",
                                        "phone",
                                    ]
                                })  
                                return {...data, ...userLeader}
                            })
                            let members = await Student.findAll({
                                where:{groupId: group.groupId},
                                order: [
                                    ["gpa", "DESC"]
                                ],
                                attributes:[
                                    "stuId",
                                    "stuCode", 
                                    "gpa",
                                    "note",
                                    "typeCapstone",
                                    "class",
                                    "userId"
                                ],
                                raw: true
                            })
                            members = members.filter(stu => stu.stuCode != leaderData.stuCode)
                            const membersData = await Promise.all(members.map(async member =>{
                                const memberData = await User.findOne({
                                    where:{
                                        userId: member.userId
                                    },
                                    raw: true,
                                    attributes: [
                                        "userId",
                                        "firstName",
                                        "lastName",
                                        "email",
                                        "phone",
                                    ]
                                })
                                return {...member, ...memberData}
                            }))
                            delete project.leaderId;
                            project.leader = leaderData;
                            project.members = membersData;
                        }
                        const mentorsGroup = await GroupLecturer.findAll({
                            where:{
                                groupId: group.groupId
                            },
                            attributes:["lecturerId"],
                            raw: true
                        })
                        const mentorsData = await Promise.all(mentorsGroup.map(async mentor =>{
                            return await lecturerService.getLecturerByLectureId(mentor.lecturerId)
                        }))
                        group.mentor = mentorsData;
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

    cancelTopic = async (projectId) =>{
        return await Project.findOne({
            where:{
                projectId
            }, raw: true
        })
        .then(async data =>{
            if(data){
                await Project.update({isApproved: "pending"},{
                    where: {
                        projectId
                    }
                });
                return true;
            }
            return false;
        })
    }

    deleteTopic = async (projectId) =>{
        return await Project.findOne({
            where:{
                projectId
            }, raw: true
        })
        .then(async data =>{
            if(data){
                const countDelete = await Project.destroy({
                    where: {
                        projectId
                    }
                })
                if(countDelete > 0)
                    return true;
            }
            return false;
        })
    }

    exportProjectListExcelFile = async () =>{
        const workbook = new exceljs.Workbook();
        const capstone1_worksheet = workbook.addWorksheet("Capstone 1");
        const capstone2_worksheet = workbook.addWorksheet("Capstone 2");
        const path="./files";

        const columnsWorksheet =[
            {
                header: "No.",
                key: "count"
            },
            {
                header: "Student Code",
                key: "stuCode"
            },
            {
                header: "First name",
                key: "firstName",
            },
            {
                header: "Last name",
                key: "lastName",
            },
            {
                header: "Class",
                key: "class",
            },
            {
                header: "Group",
                key: "groupName",
            },
            {
                header: "Topic",
                key: "projectName",
            },
            {
                header: "Description",
                key: "projectDesc",
            }
        ];

        capstone1_worksheet.columns = columnsWorksheet;
        capstone2_worksheet.columns = columnsWorksheet;

        //add row capstone1
        let counter = 1;
        await this.getAllProjectByTypeCapstone(1)
            .then(async getAllProjectByTypeCapstone1 =>{
                let rowDataCapstone1 = [];
                for(const projectByType1 of getAllProjectByTypeCapstone1){
                    //lặp qua từng row sinh vien trong group
                    await groupService.getMembersGroup(projectByType1.groupId)
                        .then(async membersGroup =>{
                            //lặp qua từng member để add voà mang rowDataCapstone1
                            for (const member of membersGroup) {
                                const major = await MajorService.getMajorByMajorId(member.majorId);
                                const department = await DepartmentService.getDepartmentByDepId(major.depId);
                                rowDataCapstone1.push({
                                        count: counter,
                                        stuCode: member.stuCode,
                                        firstName: member.firstName,
                                        lastName: member.lastName,
                                        class: `${department.depCode}-${major.majorCode}`,
                                        groupName: projectByType1.groupName,
                                        projectName: projectByType1.project ? projectByType1.project.projectName:" ",
                                        projectDesc: projectByType1.project ? projectByType1.project.projectDesc:" ",
                                    })
                                counter++;
                            }
                        })
                }
                return rowDataCapstone1;
            })
            .then(data =>{
                counter = 1;
                capstone1_worksheet.addRows(data);
            })
        
        //add row capstone2
        await this.getAllProjectByTypeCapstone(2)
            .then(async getAllProjectByTypeCapstone2 =>{
                let rowDataCapstone2 = [];
                for(const projectByType2 of getAllProjectByTypeCapstone2){
                    //lặp qua từng row sinh vien trong group
                    await groupService.getMembersGroup(projectByType2.groupId)
                        .then(async membersGroup =>{
                            //lặp qua từng member để add voà mang rowDataCapstone2
                            for (const member of membersGroup) {
                                const major = await MajorService.getMajorByMajorId(member.majorId);
                                const department = await DepartmentService.getDepartmentByDepId(major.depId);
                                rowDataCapstone2.push({
                                        count: counter,
                                        stuCode: member.stuCode,
                                        firstName: member.firstName,
                                        lastName: member.lastName,
                                        class: `${department.depCode}-${major.majorCode}`,
                                        groupName: projectByType2.groupName,
                                        projectName: projectByType2.project ? projectByType2.project.projectName:" ",
                                        projectDesc: projectByType2.project ? projectByType2.project.projectDesc:" ",
                                    })
                                counter++;
                            }
                        })
                }
                return rowDataCapstone2;
            })
            .then(data =>{
                counter = 1;
                capstone2_worksheet.addRows(data);
            })

        try {
            let url = `${path}/Danh_sach_de_tai_cac_nhom.xlsx`;
            let fileName = "Danh_sach_de_tai_cac_nhom.xlsx";
            let type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            await FileStorage.findOrCreate({
                where:{
                    fileName: fileName,
                    type:type,
                    path: url
                },
                defaults: {
                    fileName: fileName,
                    type:type,
                    path: url
                }
            });
            let data = await workbook.xlsx.writeFile(`${path}/Danh_sach_de_tai_cac_nhom.xlsx`);
            return data;
        } catch (err) {
            return "ERROR EXPORT FILE"
        }
    }

    getTopicTemplateDetail = async(projectId) =>{
        return await Project.findOne({
            where:{
                projectId,
                lecturerId: {
                    [Op.not]: null,
                }
            },
            raw: true,
            attributes:[
                "projectId",
                "projectName",
                "projectDesc",
                "note",
                "lecturerId",
                "createdAt",
                "updatedAt"
            ]
        }).then(async data =>{
            if(data){
                const lecturerData = await LecturerService.getLecturerByLectureId(data.lecturerId);
                const files = await ProjectFile.findAll({
                    where: {
                        projectId
                    }, 
                    raw: true
                })
                .then(async datas =>{
                    if(datas.length > 0){
                        datas = await Promise.all(datas.map(async file =>{
                            return await FileStorage.findOne({
                                where:{
                                    fileId: file.fileId
                                },
                                raw: true
                            })
                        }))
                    }
                    return datas;
                })
                delete data.lecturerId;
                data.lecturer = lecturerData;
                data.files = files;
            }
            return data;
        })
    }

    getAllTopicTemplate = async () =>{
        return await Project.findAll ({
            where:{
                lecturerId: {
                    [Op.not]: null
                }
            }
        })
        .then(async datas =>{
            if(datas.length > 0){
                datas = await Promise.all(datas.map(async data =>{
                    return this.getTopicTemplateDetail(data.projectId)
                }))
            }
            return datas;
        })
    }

    deleteTopicTemplate = async (lecturerId, projectId) =>{
        return await Project.findOne({
            where:{
                projectId,
                lecturerId,
            }
            ,raw: true
        })
        .then(async project =>{
            if(project){
                //xoá file gốc
                await ProjectFile.findAll({
                    where: {
                        projectId: project.projectId,
                    },
                    raw: true
                })
                .then(async projectFiles =>{
                    const fileIds = projectFiles.length > 0 ? projectFiles.map(projectFile => projectFile.fileId): [];
                    if(fileIds.length > 0)
                        await FileStorageService.deleteFilesByFileIds(fileIds);
                })

                //xoá data project
                const countDelete = await Project.destroy({
                    where: {
                        projectId,
                        lecturerId,
                    }
                })
                return countDelete > 0 ? true: false;
            }
            return null;
        })
    }
}

module.exports = new ProjectService();