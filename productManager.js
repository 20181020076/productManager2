const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = this.readFile();
  }
  readFile() {
    const products = JSON.parse(fs.readFileSync(`./dataBase/${this.path}`, "utf-8"));
    return products;
  }
  writeData(data) {
    let dataString = JSON.stringify(data);
    fs.writeFileSync(`./dataBase/${this.path}`, dataString);
  }
  idGenerator() {
    return uuidv4();
  }
  getProducts() {
    return this.readFile();
  }
  addProduct(product) {
    if (
      this.readFile().find((item) => {
        item.code === product.code;
      })
    ) {
      console.log("this code is already use, use other");
    } else if (
      !!!product.title ||
      !!!product.description ||
      !!!product.code ||
      !!!product.price ||
      !!!product.status ||
      !!!product.stock ||
      !!!product.category ||
      !!!product.thumbnails
    ) {
      console.log("Some property is null, please check again");
    } else {
      const newProduct = {
        id: this.idGenerator(),
        ...product,
      };
      let data = this.readFile();
      data.push(newProduct);
      this.writeData(data);
      console.log("product added successfully");
      return this.products;
    }
  }
  getProductsById(id) {
    let data = this.readFile();
    let productToGet = data.find((product) => product.id === id);
    if (productToGet) {
      let productFinale = data.find((product) => product.id === id);
      return productFinale;
    }
    console.log("Product doesn't found");
  }
  updateProduct(id, productUpdated) {
    if (productUpdated.id) {
      console.log("you can't modify de ID");
    } else if (
      
      this.readFile().find((item) => {
        item.code === productUpdated.code;
      })
    ) {
      console.log("this code is already use, use other");
    } else {
      let data = this.readFile();
      for (const key in data) {
        if (data[key].id === id) {
          for (const a in data[key])
            for (const b in productUpdated) {
              if (a === b) {
                data[key][a] = productUpdated[b];
              }
            }
        }
      }
      this.writeData(data);
    }
  }
  deleteProduct(id) {
    let data = this.readFile();
    if (data.find((product) => product.id === id)) {
      let productDelete = data.filter((product) => product !== id);
      this.writeData(productDelete);
    } else {
      console.log("product id not found!");
    }
  }
}
const pm = new ProductManager("product.json");

module.exports = { pm };
