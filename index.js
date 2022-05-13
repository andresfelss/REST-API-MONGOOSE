const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Product = require('./models/product');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(methodOverride('_method'));

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

// Add New Product
app.get('/products/new', (req,res)=>{
    res.render('products/new');
});
app.post('/products', async (req,res) =>{
    const newProduct =  new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})

// Updating Product

app.get('/products/:id/edit', async(req,res)=>{
    const { id } = req.params;
    const product = await Product.findById({_id: id});
    res.render('products/edit', { product });
});
app.put('/products/:id', async (req,res) =>{
    console.log(req.body);
    res.send('PUTTT');
})




// Details products
app.get('/products/:id', async(req,res)=>{
    const { id } = req.params;
    const product = await Product.findById({_id: id}); // Hallamos el producto por id
    res.render('products/show', { product });
});



app.listen(3000, ()=>{
    console.log('Listening on Port 3000 http://localhost:3000/')
})