const express = require("express");
const app = express();

const auth = require("./auth");
const chat = require("./chat");

const apiUrl = "/api";

app.use(apiUrl, auth);
app.use(apiUrl, chat);

module.exports = app;
