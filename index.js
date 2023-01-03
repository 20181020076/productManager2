const fs = require('fs');
const express = require('express');
const { response } = require('express');

class ProductManager{
    constructor(path){
        this.path = path;
        this.products = this.readFile();
    };
    readFile(){
        const products = JSON.parse(fs.readFileSync(`./${this.path}`,'utf-8'));
        return products;
    };
    writeData(data){
        let dataString = JSON.stringify(data);
        fs.appendFileSync(`./${this.path}`,dataString);
        return dataString;
    }
    idGenerator(){
        if(this.products.length > 0){
            let productsId = this.products.map(product => product.id)
            return Math.max(...productsId)+1
        }else{
            let id = 1
            return id
        }
    }
    getProducts(){
        return this.products;
    }
    addProduct(product){
        if(this.products.find((item)=>{item.code === product.code})){
            console.log("this code is already use, use other");
        }else if(
            !!!product.title ||
            !!!product.price ||
            !!!product.code ||
            !!!product.description ||
            !!!product.thumbnail ||
            !!!product.stock
        ){
            console.log("Some property is null, please check again");
        }else{
            product.id = this.idGenerator();
            this.products.push(product);
            this.writeData(this.products);
        }
    }
    getProductsById(id){
        let data = this.readFile();
        if(data.find(product => product.id===id)){
            let productFinale = data.find(product => product.id===id)
            console.log(productFinale);
            return productFinale;
        }else{
            console.log("Product doesnt found")
        }
        
    }
    updateProduct(id, product){
        let data = this.readFile();
        if(data.find(product => product.id===id)){
            let productDelete = data.filter(product => product !==id);
            product.id = id;
            productDelete.push(product);
            this.writeData(productDelete);
            return productDelete;
        }else{
            console.log("product id not found!")
        }

    }
    deleteProduct(id){
        let data = this.readFile();
         if(data.find(product => product.id===id)){
            let productDelete = data.filter(product => product !==id);
            this.writeData(productDelete);    
            return products;
        }else{
            console.log("product id not found!")
        }

    }

}


const app = express();
app.get('/',(res,req)=>{
    const pm = new ProductManager("product.json");
    req.send('home');
});
app.get('/products',(req,res)=>{
    const pm = new ProductManager("product.json");
    const products = pm.getProducts();
    console.log(products);
    res.send('products')
})
app.get('/products/:limit',(req,res)=>{
    const pm = new ProductManager("product.json");
    const products = pm.getProducts();
    console.log(products[req.params.limit]);
    res.send('products '+ req.params.limit);
})

app.listen(3000);



