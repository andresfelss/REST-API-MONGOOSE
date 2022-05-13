const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Product = require('./models/product');
const { redirect } = require('express/lib/response');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy'];


// Para conectarnos con Mongo.
main().catch(err => console.log(err))
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
    console.log('Succesful Connection')
}

// List all The products
app.get('/products', async(req,res)=>{
    const {category} = req.query;
    if (category){
        const productos = await Product.find({category: category})
        res.render('products/index', { productos, category }); // recordemos que se llama productos
    }
    else{
        const productos = await Product.find({});
        res.render('products/index', { productos, category: 'ALL' }); // recordemos que se llama productos
    }
})

// Add New Product
app.get('/products/new', (req,res)=>{
    res.render('products/new', { categories });
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
    res.render('products/edit', { product, categories });
});
app.put('/products/:id', async (req,res) =>{
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${product._id}`);
})




// Details products
app.get('/products/:id', async(req,res)=>{
    const { id } = req.params;
    const product = await Product.findById({_id: id}); // Hallamos el producto por id
    res.render('products/show', { product });
});


// Delete Prodcut
app.delete('/products/:id', async (req,res)=>{
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
});


app.listen(3000, ()=>{
    console.log('Listening on Port 3000 http://localhost:3000/')
})