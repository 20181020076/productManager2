const express = require('express');
const routerProducts = express.Router();
const {pm} = require('../productManager');


routerProducts.get('/',(req,res)=>{
    const products = pm.getProducts();
    console.log(req.query)
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
routerProducts.get('/:pid',(req,res)=>{
    res.send(pm.getProductsById(+req.params.pid));
})

module.exports = routerProducts;