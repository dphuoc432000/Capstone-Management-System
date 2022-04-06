const initLibraries = require("./config/libraries");
const Postgres = require("./db/postgresql/PostgreSQL");
const server = initLibraries();
const PORT = process.env.PORT || 5000;
const router = require("./router/index");
const db = require("./db/index");
const path = require("path");
const { deleteFile } = require("./helper/handleFile");

db.connect();
router(server);
server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});

//download
server.get("/download", function (req, res) {
    const file = `${__dirname}/upload/3142022454411912-C1SE.31-ProductBacklogAndUserStory-v1.5.xlsx`;
    res.download(file); // Set disposition and send it.
});

//
// console.log(deleteFile('\\upload\\roles.csv'));

server.listen(PORT, () => {
    console.log("Server run at " + PORT);
});
