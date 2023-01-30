const express = require("express");
const routerCarts = express.Router();
const { cm } = require("../cartsManager");
routerCarts.post("/", (req, res) => {
  cm.addCart();
  res.send(cm.readFile());
});
routerCarts.get("/:cid", (req, res) => {
  const cartId = req.params.cid;
  res.send(cm.getCartsById(cartId).products);
});
routerCarts.post("/:cid/product/:pid", (req, res) => {
  const carritoId = req.params.cid;
  const productoId = req.params.pid;
  cm.addProductCart(carritoId,productoId);
  res()


});

module.exports = routerCarts;
