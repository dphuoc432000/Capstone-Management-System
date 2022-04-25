const DefenseService = require('../service/DefenseService');

class DefenseController {
    createDefense = async (req,res)=>{
        await DefenseService.createDefense(req.body)
        .then(data=>{
            if(data){
                res.status(200).send('create defense success');
            }else {
                res.status(400).send('something went wrong!');
            }
        }).catch(err=>{
            res.status(500).send(err.message);
        })
    }

    assignGroupDefense = async (req,res)=>{
        await DefenseService.assignGroupDefense(req.body)
        .then(data=>{
            return data?res.status(200).send("assign success"):res.status(400).send("something went wrong!");
        }).catch(err=>{
            res.status(500).send(err.message);
        })
    }

    getAllDefense = async (req,res)=>{
        await DefenseService.getAllDefense()
        .then(data=>{
            if(data){
               return res.status(200).send(data);
            }
            return res.status(400).send("something went wrong");
        }).catch(err=>{
            res.status(500).send(err.message);
        })
    }

    getAllDefenseByLecturerId = async (req,res)=>{
        await DefenseService.getAllDefenseByLecturerId(req.params.lecturerId)
        .then(data=>{
            console.log(data);
            if(data){
               return res.status(200).send(data);
            }
            return res.status(400).send("something went wrong");
        }).catch(err=>{
            res.status(500).send(err.message);
        })
    }

}

module.exports = new DefenseController();