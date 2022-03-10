const studentService = require("../service/StudentService");

class StudentController {
    registerExecuteProject = async (req, res) => {
        await studentService.registerExecuteProject(req.body).then(data => {
            if (data) {
                if (data !== "STUDENT IS IN DB") {
                    return res.status(200).send(data);
                }
                return res.status(400).send("register fail");
            }
            return res.status(400).send("register fail");
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
}

module.exports = new StudentController();