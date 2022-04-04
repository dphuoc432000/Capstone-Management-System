const studentService = require("../service/StudentService");

class StudentController {
    registerExecuteProject = async (req, res) => {
        await studentService.registerExecuteProject(req.body).then(data => {
            if (data) {
                if (data !== "STUDENT IS IN DB") {
                    return res.status(200).send("register success");
                }
                return res.status(400).send("STUDENT IS IN DB");
            }
            else return res.status(400).send("something went wrong");
        }).catch(err => {
            return res.status(500).send(err.message);
        })
    }
    deleteStudent = async (req, res) => {
        try {
            await studentService.deleteStudent(req.params.id);
            return res.status(200).send("delete success!");
        } catch (err) {
            res.status(500).send(err.message);
        };
    }
    getStudent = async (req, res) => {
        await studentService.getStudent(req.params.id).
        then(data => {
            if (data) {
                return res.status(200).send(data);
            }
            return res.status(400).send("error get data");
        }).catch(err => {
            return res.status(500).send(err.message);
        });
    }

    approveStudent = async (req,res)=>{
        await studentService.approveStudent(req.params.id)
        .then(data =>{
            if(data){
                res.status(200).send("update success");
            }
            else res.status(400).send("no file student");
        }).catch(err=>{
            console.log(err.message);
            res.status(500).send(err.message);
        })
    }

    getAllStudent = async (req, res) => {
        await studentService.getAllStudent().
        then(data => {
            if (data) {
                return res.status(200).send(data);
            }
            return res.status(400).send("error get data");
        }).catch(err => {
            return res.status(500).send(err.message);
        });
    }

    createTopic = async(req, res, next) =>{
        await studentService.createTopic(req.params.stuId,req.body)
            .then(data =>{
                if(data === "UNAPPROVED STUDENT OR LEADER")
                    return res.status(400).send("Student or leader is unapproved");
                return res.status(200).send(data);
            }).catch(err => {
                return res.status(500).send(err.message);
            });
    }
}

module.exports = new StudentController();