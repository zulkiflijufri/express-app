const express = require("express");
const routers = express.Router();
const path = require("path");

const ObjectId = require("mongodb").ObjectId;

const multer = require("multer");
const upload = multer({ dest: "public" });

const fs = require("fs");

const client = require("./connection");

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

// get products
routers.get("/products", async (req, res) => {
  if (client.isConnected()) {
    const db = client.db("latihan");
    const products = await db.collection("products").find().toArray();

    if (products.length > 0) {
      res.send({
        status: "success",
        message: "List data products",
        data: products,
      });
    } else {
      res.send({
        status: "404",
        message: "List data products empty",
      });
    }
  } else {
    res.send({
      status: "error",
      message: "connect error",
    });
  }
});

// get product by id
routers.get("/product/:id", async (req, res) => {
  if (client.isConnected()) {
    const db = client.db("latihan");
    const product = await db.collection("products").findOne({
      _id: ObjectId(req.params.id),
    });

    if (product) {
      res.send({
        status: "success",
        message: "Single product",
        data: product,
      });
    } else {
      res.send({
        status: "404",
        message: "Product not found",
      });
    }
  } else {
    res.send("connect error");
  }
});

// create product
routers.post("/product", async (req, res) => {
  if (client.isConnected()) {
    const { name, price, stock, status } = req.body;
    const db = client.db("latihan");
    const result = await db.collection("products").insertOne({
      name,
      price,
      stock,
      status,
    });

    if (result.insertedCount == 1) {
      res.send({
        status: "success",
        message: "Add product success",
      });
    } else {
      res.send({
        status: "warning",
        message: "Add product failed",
      });
    }
  } else {
    res.send("connect error");
  }
});

// update product
routers.put("/product/:id", async (req, res) => {
  if (client.isConnected()) {
    const { name, price, stock, status } = req.body;
    const db = client.db("latihan");
    const result = await db.collection("products").updateOne(
      {
        _id: ObjectId(req.params.id),
      },
      {
        $set: {
          name,
          price,
          stock,
          status,
        },
      }
    );

    if (result.matchedCount == 1) {
      res.send({
        status: "success",
        message: "Update product success",
      });
    } else {
      res.send({
        status: "warning",
        message: "Update product failed",
      });
    }
  } else {
    res.send("connect error");
  }
});

// delete product
routers.delete("/product/:id", async (req, res) => {
  if (client.isConnected()) {
    const db = client.db("latihan");
    const result = await db.collection("products").deleteOne({
      _id: ObjectId(req.params.id),
    });

    if (result.deletedCount == 1) {
      res.send({
        status: "success",
        message: "Delete product success",
      });
    } else {
      res.send({
        status: "warning",
        message: "Delete product failed",
      });
    }
  } else {
    res.send("connect error");
  }
});

module.exports = routers;
