const fs = require('fs');
const path = require('path');

const deleteFile = (pathFile) =>{
    let checkDelete = false;
    fs.unlink(path.join('..\\server', pathFile), (err) => {
        if (err) {
            console.log(err);
        }
        else
            checkDelete = true;
    });
    return checkDelete;
}

module.exports = {deleteFile};