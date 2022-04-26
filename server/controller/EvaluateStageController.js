const EvaluateStageService = require("../service/EvaluateStageService");

class EvaluateStageController {

    addEvaluates = async (req, res, next) =>{
        await EvaluateStageService.addEvaluates(req.body)
            .then(data =>{
                if(data) 
                    return res.status(200).send(data);
                return res.status(400).send("Lỗi thêm evaludate");
            })
            .catch(err => res.status(500).send(err.message));
    }

}

module.exports = new EvaluateStageController();