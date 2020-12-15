const express = require("express");
const app = express();
const port = 3000;

const routers = require("./routers");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routers);

// for middleware 404 put after all routes
const notFound = (req, res, next) => {
  res.json({
    status: "error",
    message: "resource tidak ditemukan",
  });
};

app.use(notFound);

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
