
const express = require('express');





const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products', require('./routes/products.router'));
app.use('/api/carts', require('./routes/carts.router'));

app.get('/',(req,res)=>{
    res.send('Home');
});



const PORT = 8080;
app.listen(PORT,()=>{
    console.log(`servidor escuchando en el puerto ${PORT}`)
});



