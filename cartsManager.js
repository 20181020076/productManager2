const fs = require("fs");
const { get } = require("http");
const { v4: uuidv4 } = require("uuid");
class CartsManager {
  constructor(path) {
    this.path = path;
    this.carts = this.readFile();
  }
  readFile() {
    const carts = JSON.parse(
      fs.readFileSync(`./dataBase/${this.path}`, "utf-8")
    );
    return carts;
  }
  writeData(data) {
    let dataString = JSON.stringify(data);
    fs.writeFileSync(`./dataBase/${this.path}`, dataString);
  }
  idGenerator() {
    return uuidv4();
  }
  addCart() {
    const newCart = {
      id: this.idGenerator(),
      products: [],
    };
    let data = this.carts;
    data.push(newCart);
    this.writeData(data);
  }
  getCartsById(id) {
    let data = this.carts;
    let cartToGet = data.find((cart) => cart.id === id);
    if (cartToGet) {
      return cartToGet;
    }
    console.log("Product doesn't found");
  }
  addProductCart(cartId, productId) {
    let data = this.carts;
    let cartToGet = this.getCartsById(cartId);
    cartToGet.products.push(productId);
    this.writeData(data)
    console.log(cartToGet.products);
  }
}
const cm = new CartsManager("carts.json");
module.exports = { cm };
