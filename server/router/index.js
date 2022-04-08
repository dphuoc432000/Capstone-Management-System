const roleAPI = require('./api/roleAPI');
const userAPI = require('./api/userAPI');
const user_roleAPI = require('./api/user_roleAPI');
const lecturerAPI = require('./api/lecturerAPI');
const departmentAPI = require('./api/departmentAPI');
const majorAPI = require('./api/majorAPI');
const studentAPI = require('./api/studentAPI')
const fileStorageAPI = require('./api/fileStorageAPI');
const notificationAPI = require('./api/notificationAPI');
<<<<<<< HEAD
const groupAPI = require('./api/groupAPI');
=======
const projectAPI = require('./api/projectAPI');
const sampleDocumentAPI = require('./api/sampleDocumentAPI');

>>>>>>> d6455c0fa4d530b1c9808ec39e4f215692cb53d8
function router(server) {
    server.use('/api/role/', roleAPI);
    server.use('/api/user/', userAPI);
    server.use('/api/user_role/', user_roleAPI);
    server.use('/api/lecturer/', lecturerAPI);
    server.use('/api/department/', departmentAPI);
    server.use('/api/major/', majorAPI);
    server.use('/api/student/', studentAPI)
    server.use('/api/fileStorage/', fileStorageAPI);
    server.use('/api/notification/', notificationAPI);
<<<<<<< HEAD
    server.use('/api/group/', groupAPI);
=======
    server.use('/api/project/', projectAPI);
    server.use('/api/sampleDocument/', sampleDocumentAPI);
>>>>>>> d6455c0fa4d530b1c9808ec39e4f215692cb53d8
}


module.exports = router;