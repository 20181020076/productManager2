const express = require("express");
const routerProducts = express.Router();
const { pm } = require("../productManager");

routerProducts.get("/", (req, res) => {
  const products = pm.getProducts();
  console.log(req.query);
  if (req.query.limit) {
    const productsLimited = products.slice(0, req.query.limit);
    res.send(JSON.stringify(productsLimited));
  } else {
    res.send(JSON.stringify(products));
  }
});

routerProducts.get("/:pid", (req, res) => {
  res.send(pm.getProductsById(req.params.pid));
});
routerProducts.put("/:pid", (req, res) => {
  pm.updateProduct(req.params.pid,req.body);
  // console.log(pm.getProducts());
  res.send(pm.getProducts())
});
routerProducts.delete("/:pid",(req,res)=>{
  pm.deleteProduct(req.params.pid)
  res.send(pm.getProducts())
})

routerProducts.post("/", (req, res) => {
  new Promise((resolve, reject) => {
    pm.addProduct(req.body);
  }).then(res.send(pm.getProducts()));
});
module.exports = routerProducts;
