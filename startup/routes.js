const express = require("express");
const tasks = require("../routes/task");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.static("public"));
  app.use("/api/tasks", tasks);
};
