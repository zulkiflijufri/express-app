const express = require("express");
const routers = express.Router();
const path = require("path");

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

routers.get("/download", (req, res) => {
  const filename = "profil.jpg";
  // res.download(path.join(__dirname, filename), 'photo-profil.png')
  res.sendFile(path.join(__dirname, "public", filename), {
    // change name file
    headers: {
      "Content-Disposition": 'attachment; filename="photo-profil.jpg"',
    },
  });
});

module.exports = routers;
