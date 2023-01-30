const express = require("express");
const routerCarts = express.Router();

routerCarts.post("/", (req, res) => {
  res.send("Carrito creado");
});
routerCarts.get("/:cid", (req, res) => {
    const carritoId = req.params.cid;
});
routerCarts.post("/:cid/product/:pid", (req, res) => {
    const carritoId = req.params.cid;
    const productoId = req.params.pid;
});

module.exports = routerCarts
