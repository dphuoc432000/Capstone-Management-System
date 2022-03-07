const roleAPI = require('./api/roleAPI');
const userAPI = require('./api/userAPI');
const user_roleAPI = require('./api/user_roleAPI');
const lecturerAPI = require('./api/lecturerAPI');

function router(server) {
    server.use('/api/role/', roleAPI);
    server.use('/api/user/', userAPI);
    server.use('/api/user_role/', user_roleAPI);
    server.use('/api/lecturer/', lecturerAPI)
}


module.exports = router;