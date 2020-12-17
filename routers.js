const express = require("express");
const routers = express.Router();
const path = require("path");

const ObjectId = require("mongodb").ObjectId;

const multer = require("multer");
const upload = multer({ dest: "public" });

const fs = require("fs");

// const client = require("./connection");
require("./connection");
const Products = require("./Product");

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
  const products = await Products.find();

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
});

// get product by id
routers.get("/product/:id", async (req, res) => {
  const product = await Products.findById(req.params.id);

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
});

// create product
routers.post("/product", multer().none(), async (req, res) => {
  const { name, price, stock, status } = req.body;
  try {
    const result = await Products.create({
      name,
      price,
      stock,
      status,
    });

    if (result) {
      res.send({
        status: "success",
        message: "Add product success",
        data: result,
      });
    } else {
      res.send({
        status: "warning",
        message: "Add product failed",
      });
    }
  } catch (error) {
    res.send({
      status: "error",
      message: error.message,
    });
  }
});

// update product
routers.put("/product/:id", async (req, res) => {
  const { name, price, stock, status } = req.body;

  try {
    const result = await Products.updateOne(
      { _id: req.params.id },
      {
        name,
        price,
        stock,
        status,
      },
      { runValidators: true }
    );

    if (result.ok == 1) {
      res.send({
        status: "success",
        message: "Update product success",
        data: result,
      });
    } else {
      res.send({
        status: "warning",
        message: "Update product failed",
        data: result,
      });
    }
  } catch (error) {
    res.send({
      error: "error",
      message: error.message,
    });
  }
});

// delete product
routers.delete("/product/:id", async (req, res) => {
  try {
    const result = await Products.deleteOne({
      _id: req.params.id,
    });

    if (result.deletedCount == 1) {
      res.send({
        status: "success",
        message: "Delete product success",
        data: result,
      });
    } else {
      res.send({
        status: "warning",
        message: "Delete product failed",
        data: result,
      });
    }
  } catch (error) {
    res.send({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = routers;
