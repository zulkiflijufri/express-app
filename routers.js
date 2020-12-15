const express = require("express");
const routers = express.Router();

routers.get("/users/:id?", (req, res) => {
  if (!req.params.id) {
    res.send("Paramater belum diset");
  }

  res.send("Detail user " + req.params.id);
});

routers.post("/login", (req, res) => {
  const { name, password } = req.body;
  res.send(name + " login dengan password " + password);
});

module.exports = routers;
