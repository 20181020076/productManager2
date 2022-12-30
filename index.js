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
    writeData(data){
        let dataString = JSON.stringify(data);
        fs.writeFileSync(`./${this.path}`,dataString);
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
        console.log(this.products);
        return this.products;
    }
    addProduct(product){
        if(this.products.find((item)=>{item.code === product.code})){
            return console.log("this code is already use, use other");
        }else if(
            !!!product.title ||
            !!!product.price ||
            !!!product.code ||
            !!!product.description ||
            !!!product.thumnail ||
            !!!product.stock
        ){
            return console.log("Some property is null, please check again");
        }else{
            let data = this.readFile();
            product.id = this.idGenerator();
            this.products.push(product);
            this.writeData(data)
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
const pm = new ProductManager("product.json");
let producto = {
    title:"camiseta pinguino",
    description:"camiseta oversize estampado pinguino",
    price:45000,
    thumbnail: "camiseta-pinguino.jpg",
    code:"1597",
    stock: 13
}
pm.getProductsById(1);
pm.getProducts();