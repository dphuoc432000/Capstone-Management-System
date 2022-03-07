const { User, initUser } = require("../models/UserModel");
const { FileStorage, initFileStorage } = require("../models/FileStorageModel");
const { Major, initMajor } = require("../models/MajorModel");
const { Department, initDepartment } = require("../models/DepartmentModel");
const { UserRole, initUserRole } = require("../models/UserRoleModel");
const { Lecturer, initLecturer } = require("../models/LecturerModel");
const { Student, initStudent } = require("../models/StudentModel");
const { TaskAssignment, initTaskAssignment } = require("../models/TaskAssigmentModel");
const { Comment, initComment } = require("../models/CommentModel");
const { Group, initGroup } = require("../models/GroupModel");
const { Task, initTask } = require("../models/TaskModel");
const { GroupStudent, initGroupStudent } = require("../models/GroupStudentModel");
const { CouncilMember, initCouncilMember } = require("../models/CouncilMemberModel");
const { Score, initScore } = require("../models/ScoreModel");
const { Stage, initStage } = require("../models/StageModel");
const { Project, initProject } = require("../models/ProjectModel");
const { Council, initCouncil } = require("../models/CouncilModel");
const { Role, initRole } = require("../models/RoleModel");
const { GroupLecturer, initGroupLecturer } = require("../models/GroupLecturerModel");

const initAll = async () => {
    await initDepartment()
        .then(async () => {
            await initMajor();
            await initCouncil();
            await initRole();
        }).then(async () => {
            await initUser();
        })
        .then(async () => {
            await initFileStorage();
            await initUserRole();
        })
        .then(async () => {
            await initLecturer();
            await initStudent();
            await initGroup();
        }).then(async () => {
            await initGroupLecturer();
            await initGroupStudent();
            await initProject();
        }).then(async () => {
            await initStage();

        }).then(async () => {
            await initTask();
        }).then(async () => {
            await initTaskAssignment();
            await initComment();
            await initCouncilMember();
            await initScore();
        })
}

initAll();

module.exports = {
    Department,
    Major,
    Council,
    Role,
    User,
    FileStorage,
    UserRole,
    Lecturer,
    Student,
    Group,
    GroupLecturer,
    GroupStudent,
    Project,
    Stage,
    Task,
    TaskAssignment,
    Comment,
    CouncilMember,
    Score,
};