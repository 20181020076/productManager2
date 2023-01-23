const express = require('express');
const routerProducts = express.Router();


routerProducts.get('/',(req,res)=>{
    const pm = new ProductManager("product.json");
    const products = pm.getProducts();
    //console.log(products);
    if(req.query.limit){
        const productsLimited = products.slice(0,req.query.limit);
        res.send(JSON.stringify(productsLimited));
    }else{
        const text = `
            <div>
                hola
            </div>
        `;
        res.send(JSON.stringify(products));
        
        
    }
})

module.exports = routerProducts;