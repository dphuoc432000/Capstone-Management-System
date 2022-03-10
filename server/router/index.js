const roleAPI = require('./api/roleAPI');
const userAPI = require('./api/userAPI');
const user_roleAPI = require('./api/user_roleAPI');
const lecturerAPI = require('./api/lecturerAPI');
const departmentAPI = require('./api/departmentAPI');
const majorAPI = require('./api/majorAPI');
const studentAPI = require('./api/studentAPI')

function router(server) {
    server.use('/api/role/', roleAPI);
    server.use('/api/user/', userAPI);
    server.use('/api/user_role/', user_roleAPI);
    server.use('/api/lecturer/', lecturerAPI);
    server.use('/api/department/', departmentAPI);
    server.use('/api/major/', majorAPI);
    server.use('/api/student/', studentAPI)
}


module.exports = router;