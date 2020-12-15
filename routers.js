const express = require("express");
const routers = express.Router();
const path = require("path");

const multer = require("multer");
const upload = multer({ dest: "public" });

const fs = require("fs");

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

// 'file' is key name or name req form
routers.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (file) {
    const target = path.join(__dirname, "public", file.originalname);
    fs.renameSync(file.path, target);
    res.send("File berhasil diupload");
  } else {
    res.send("File gagal diupload");
  }
});

module.exports = routers;
