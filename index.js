const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/product');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

// Para conectarnos con Mongo.
main().catch(err => console.log(err))
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
    console.log('Succesful Connection')
}

// List all The products
app.get('/products', async(req,res)=>{
    const productos = await Product.find({});
    res.render('products/index', { productos }); // recordemos que se llama productos
})


// Details products
app.get('/products/:id', async(req,res)=>{
    const { id } = req.params;
    const product = await Product.findById({_id: id}); // Hallamos el producto por id
    console.log(product)
    res.send('Details page')
})

app.listen(3000, ()=>{
    console.log('Listening on Port 3000 http://localhost:3000/')
})