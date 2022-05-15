const mongoose = require('mongoose');
const Product = require('./product');
const {Schema} = mongoose;

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Farm Must have a name!']
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email Requires']
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
})

// deleting middleware the find one and delete
farmSchema.post('findOneAndDelete', async function(farm){ // en el post si tengo acceso a la data
    if (farm.products.length){
        // elimino todos os productos que esten en farm prodcuts basados en el id
        const res = await Product.deleteMany({_id:{$in: farm.products}})
        console.log(res);
    }
    console.log('Post middleware mongoose');
});

const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;