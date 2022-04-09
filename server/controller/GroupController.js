const GroupService = require("../service/GroupService");


class GroupController {
    createGroup = async (req,res)=>{
        await GroupService.createGroup(req.body).then(data=>{
            if(data){
                return res.status(200).send("create group is success");
            }
            return res.status(400).send("something went wrong"); 
        }).catch(error=>{
            return res.status(500).send(error.message);
        })   
    }

    assignMentor = async (req,res)=>{
        await GroupService.assignMentor(req.body).then (data=>{
            if(data){
                return res.status(200).send("assign  group is success");
            }
            return res.status(400).send("something went wrong");
        }).catch(error=>{
            return res.status(500).send(error.message);
        }) 
    }

    getAllGroup = async (req,res)=>{
        await GroupService.getAllGroup().then (data=>{
            if(data){
                return res.status(200).send(data);
            }
            return res.status(400).send("something went wrong");
        }).catch(error=>{
            return res.status(500).send(error.message);
        }) 
    }
}

module.exports = new GroupController;
