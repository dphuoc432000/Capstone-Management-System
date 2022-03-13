const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const HOST_URL = process.env.HOST_URL;
const path = require('path');

function initLibraries() {
  const server = express();
  server.use(cors({
    origin: HOST_URL,
    optionsSuccessStatus: 200,
    credentials: true
  }));
  server.use(cookieParser());
  server.use(bodyParser.urlencoded({extended: false}));
  // server.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));
  server.use(bodyParser.json());
  server.use(express.static(path.join(__dirname)));
  dotenv.config();
  return server;
}

module.exports = initLibraries;
