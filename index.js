const fs = require('fs');
class ProductManager{
    constructor(path){
        this.path = path;
        this.products = this.readFile();
    };
    readFile(){
        const products = JSON.parse(fs.readFileSync(`./${this.path}`,'utf-8'));
        return products;
    };
    getProducts(){
        return this.products;
    }
    addProduct(product){
        if(this.products.find((item)=>{item.code === product.code})){
            return console.log("this code is already use, use other");
        }else if(product.indexOf(null)!=-1){
            return console.log("Some property is null, please check again");
        }else{
            this.products.push(product);
        }
    }

}