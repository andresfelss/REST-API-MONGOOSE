const mongoose = require('mongoose');
const Product = require('./models/product');

// Para conectarnos con Mongo.
main().catch(err => console.log(err))
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
    console.log('Succesful Connection')
}

// const p = new Product({
//     name: 'Manzana',
//     price: 1.2,
//     category: 'fruit'
// })

// p.save().then(p =>{
//     console.log(p);
// })
// .catch(e =>{
//     console.log(e)
// })
const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Pera',
        price: 1.5,
        category: 'fruit'
    },
    {
        name: 'Perejil',
        price: 2,
        category: 'vegetable'
    },
    {
        name: 'Mamon',
        price: 0.1,
        category: 'fruit'
    },
]

Product.insertMany(seedProducts)
.then(res =>{
    console.log(res);
}).catch(e =>{
    console.log(e);
})