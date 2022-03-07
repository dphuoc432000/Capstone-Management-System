const initLibraries = require("./config/libraries");
const Postgres = require("./db/postgresql/PostgreSQL");
const server = initLibraries();
const PORT = process.env.PORT || 5000;
const router = require('./router/index');
const db = require('./db/index');

db.connect();
router(server);

server.listen(PORT, () => {
  console.log("Server run at " + PORT);
});
